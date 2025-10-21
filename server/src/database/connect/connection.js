const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

/**
 * PostgreSQL Database Connection Manager
 * Provides connection pooling, error handling, and health monitoring
 */
class DatabaseConnection {
  constructor() {
    this.pool = null;
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxRetries = 5;
    this.retryDelay = 2000; // 2 seconds
    this.healthCheckInterval = null;
    this.lastHealthCheck = null;
    this.connectionStats = {
      totalConnections: 0,
      activeConnections: 0,
      idleConnections: 0,
      waitingCount: 0,
      totalQueries: 0,
      failedQueries: 0,
      lastError: null
    };
  }

  /**
   * Initialize database connection pool
   */
  async initialize() {
    try {
      console.log('🔌 Initializing PostgreSQL connection...');
      
      // Database configuration
      const config = {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'gro_development',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        
        // Connection pool settings
        min: parseInt(process.env.DB_POOL_MIN) || 2,
        max: parseInt(process.env.DB_POOL_MAX) || 10,
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT) || 30000,
        connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 10000,
        
        // SSL configuration for production
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
          ca: process.env.DB_SSL_CA || null
        } : false,
        
        // Application name for monitoring
        application_name: 'gro_backend',
        
        // Query timeout
        query_timeout: parseInt(process.env.DB_QUERY_TIMEOUT) || 30000,
        
        // Statement timeout
        statement_timeout: parseInt(process.env.DB_STATEMENT_TIMEOUT) || 30000
      };

      // Create connection pool
      this.pool = new Pool(config);

      // Set up pool event handlers
      this.setupPoolEvents();

      // Test initial connection
      await this.testConnection();

      // Start health monitoring
      this.startHealthMonitoring();

      console.log('✅ PostgreSQL connection initialized successfully');
      console.log(`📊 Pool config: min=${config.min}, max=${config.max}`);
      
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize database connection:', error.message);
      await this.handleConnectionError(error);
      throw error;
    }
  }

  /**
   * Set up pool event handlers for monitoring
   */
  setupPoolEvents() {
    if (!this.pool) return;

    // Connection established
    this.pool.on('connect', (client) => {
      this.connectionStats.totalConnections++;
      console.log(`🔗 New database connection established (Total: ${this.connectionStats.totalConnections})`);
    });

    // Connection removed
    this.pool.on('remove', (client) => {
      console.log('🔌 Database connection removed from pool');
    });

    // Pool error
    this.pool.on('error', (err, client) => {
      console.error('❌ Database pool error:', err.message);
      this.connectionStats.lastError = {
        message: err.message,
        timestamp: new Date(),
        code: err.code
      };
    });

    // Acquire connection
    this.pool.on('acquire', (client) => {
      this.connectionStats.activeConnections++;
    });

    // Release connection
    this.pool.on('release', (client) => {
      this.connectionStats.activeConnections--;
      this.connectionStats.idleConnections++;
    });
  }

  /**
   * Test database connection
   */
  async testConnection() {
    if (!this.pool) {
      throw new Error('Database pool not initialized');
    }

    try {
      const client = await this.pool.connect();
      const result = await client.query('SELECT NOW() as current_time, version() as version');
      client.release();
      
      this.isConnected = true;
      this.lastHealthCheck = new Date();
      
      console.log('✅ Database connection test successful');
      console.log(`📅 Server time: ${result.rows[0].current_time}`);
      
      return result.rows[0];
    } catch (error) {
      this.isConnected = false;
      console.error('❌ Database connection test failed:', error.message);
      throw error;
    }
  }

  /**
   * Execute a database query with error handling and stats tracking
   */
  async query(text, params = []) {
    if (!this.pool) {
      throw new Error('Database pool not initialized');
    }

    const startTime = Date.now();
    let client;

    try {
      client = await this.pool.connect();
      this.connectionStats.totalQueries++;
      
      const result = await client.query(text, params);
      const duration = Date.now() - startTime;
      
      // Log slow queries (over 1 second)
      if (duration > 1000) {
        console.warn(`⚠️ Slow query detected (${duration}ms):`, text.substring(0, 100));
      }
      
      return result;
    } catch (error) {
      this.connectionStats.failedQueries++;
      this.connectionStats.lastError = {
        message: error.message,
        timestamp: new Date(),
        query: text.substring(0, 100),
        code: error.code
      };
      
      console.error('❌ Database query error:', error.message);
      console.error('📝 Query:', text.substring(0, 100));
      
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  /**
   * Execute a transaction with automatic rollback on error
   */
  async transaction(callback) {
    if (!this.pool) {
      throw new Error('Database pool not initialized');
    }

    const client = await this.pool.connect();
    
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('❌ Transaction rolled back:', error.message);
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Start health monitoring
   */
  startHealthMonitoring() {
    // Health check every 30 seconds
    this.healthCheckInterval = setInterval(async () => {
      try {
        await this.healthCheck();
      } catch (error) {
        console.error('❌ Health check failed:', error.message);
      }
    }, 30000);

    console.log('🔍 Database health monitoring started');
  }

  /**
   * Perform health check
   */
  async healthCheck() {
    try {
      const result = await this.query('SELECT 1 as health_check');
      this.isConnected = true;
      this.lastHealthCheck = new Date();
      
      // Update connection stats
      this.updateConnectionStats();
      
      return {
        status: 'healthy',
        timestamp: this.lastHealthCheck,
        responseTime: Date.now() - this.lastHealthCheck.getTime()
      };
    } catch (error) {
      this.isConnected = false;
      console.error('❌ Database health check failed:', error.message);
      
      return {
        status: 'unhealthy',
        timestamp: new Date(),
        error: error.message
      };
    }
  }

  /**
   * Update connection statistics
   */
  updateConnectionStats() {
    if (!this.pool) return;

    this.connectionStats.totalConnections = this.pool.totalCount;
    this.connectionStats.idleConnections = this.pool.idleCount;
    this.connectionStats.waitingCount = this.pool.waitingCount;
  }

  /**
   * Get database connection status and statistics
   */
  getStatus() {
    this.updateConnectionStats();
    
    return {
      isConnected: this.isConnected,
      lastHealthCheck: this.lastHealthCheck,
      connectionAttempts: this.connectionAttempts,
      pool: this.pool ? {
        totalCount: this.pool.totalCount,
        idleCount: this.pool.idleCount,
        waitingCount: this.pool.waitingCount
      } : null,
      stats: { ...this.connectionStats },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME
      }
    };
  }

  /**
   * Handle connection errors with retry logic
   */
  async handleConnectionError(error) {
    this.connectionAttempts++;
    this.isConnected = false;
    
    console.error(`❌ Database connection error (attempt ${this.connectionAttempts}):`, error.message);
    
    if (this.connectionAttempts < this.maxRetries) {
      console.log(`⏳ Retrying connection in ${this.retryDelay}ms...`);
      await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      
      try {
        await this.initialize();
      } catch (retryError) {
        console.error('❌ Retry failed:', retryError.message);
      }
    } else {
      console.error('💀 Max connection retries reached. Database unavailable.');
    }
  }

  /**
   * Gracefully close database connection
   */
  async close() {
    try {
      // Stop health monitoring
      if (this.healthCheckInterval) {
        clearInterval(this.healthCheckInterval);
        this.healthCheckInterval = null;
      }

      // Close connection pool
      if (this.pool) {
        await this.pool.end();
        this.pool = null;
      }

      this.isConnected = false;
      console.log('✅ Database connection closed gracefully');
    } catch (error) {
      console.error('❌ Error closing database connection:', error.message);
      throw error;
    }
  }

  /**
   * Run database schema migration from SQL file
   */
  async runMigration(sqlFilePath) {
    try {
      const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
      await this.query(sqlContent);
      console.log(`✅ Migration executed: ${path.basename(sqlFilePath)}`);
    } catch (error) {
      console.error(`❌ Migration failed: ${path.basename(sqlFilePath)}`, error.message);
      throw error;
    }
  }
}

// Create singleton instance
const dbConnection = new DatabaseConnection();

// Export both the class and instance
module.exports = {
  DatabaseConnection,
  dbConnection,
  
  // Convenience methods
  initialize: () => dbConnection.initialize(),
  query: (text, params) => dbConnection.query(text, params),
  transaction: (callback) => dbConnection.transaction(callback),
  getStatus: () => dbConnection.getStatus(),
  healthCheck: () => dbConnection.healthCheck(),
  close: () => dbConnection.close(),
  runMigration: (sqlFilePath) => dbConnection.runMigration(sqlFilePath)
};