const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Import database connection
const { connectDB } = require('./database/connect/connection');

// Import middleware
const authMiddleware = require('./shared/middleware/auth');
const rateLimitMiddleware = require('./shared/middleware/rate-limit');
const errorHandler = require('./shared/middleware/error-handler');
const validation = require('./shared/middleware/validation');

// Import stage routes
const goalAnalysisRoutes = require('./stages/01-goal-analysis/routes/goal-analysis');
const screeningRoutes = require('./stages/02-universe-screening/routes/screening');
const analysisRoutes = require('./stages/03-ai-analysis/routes/analysis');
const optimisationRoutes = require('./stages/04-portfolio-optimisation/routes/optimisation');
const validationRoutes = require('./stages/05-monte-carlo-validation/routes/validation');
const monitoringRoutes = require('./stages/06-monitoring/routes/monitoring');

// Import auth routes
const authLoginRoutes = require('./api/auth/routes/login');
const authRegisterRoutes = require('./api/auth/routes/register');
const authMeRoutes = require('./api/auth/routes/me');
const authLogoutRoutes = require('./api/auth/routes/logout');
const authDeleteRoutes = require('./api/auth/routes/deleteData');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to PostgreSQL database
connectDB();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, process.env.CLIENT_URL] 
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust proxy for rate limiting (if behind reverse proxy)
app.set('trust proxy', 1);

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Gro Investment Platform API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    status: 'healthy',
    uptime: process.uptime()
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'Gro API is running',
    stages: {
      goalAnalysis: 'active',
      screening: 'active', 
      analysis: 'active',
      optimisation: 'active',
      validation: 'active',
      monitoring: 'active'
    },
    features: {
      authentication: 'enabled',
      rateLimit: 'enabled',
      cors: 'enabled',
      security: 'enabled'
    }
  });
});

// Test CORS endpoint
app.get('/test-cors', (req, res) => {
  res.json({
    success: true,
    message: 'CORS is working!',
    origin: req.get('Origin'),
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
});

// Authentication routes (public endpoints)
app.use('/api/auth/login', authLoginRoutes);
app.use('/api/auth/register', authRegisterRoutes);
app.use('/api/auth/logout', authLogoutRoutes);

// Protected authentication routes
app.use('/api/auth/me', authMiddleware, authMeRoutes);
app.use('/api/auth/delete-data', authMiddleware, authDeleteRoutes);

// Stage 1: Goal Analysis routes (protected)
app.use('/api/goal-analysis', authMiddleware, rateLimitMiddleware.general, goalAnalysisRoutes);

// Stage 2: Universe Screening routes (protected)
app.use('/api/screening', authMiddleware, rateLimitMiddleware.general, screeningRoutes);

// Stage 3: AI Analysis routes (protected)
app.use('/api/analysis', authMiddleware, rateLimitMiddleware.general, analysisRoutes);

// Stage 4: Portfolio Optimisation routes (protected)
app.use('/api/optimisation', authMiddleware, rateLimitMiddleware.general, optimisationRoutes);

// Stage 5: Monte Carlo Validation routes (protected)
app.use('/api/validation', authMiddleware, rateLimitMiddleware.general, validationRoutes);

// Stage 6: Monitoring routes (protected)
app.use('/api/monitoring', authMiddleware, rateLimitMiddleware.general, monitoringRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Gro Investment Platform API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      health: '/health',
      status: '/api/status',
      testCors: '/test-cors',
      auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
        me: '/api/auth/me',
        deleteData: '/api/auth/delete-data'
      },
      stages: {
        goalAnalysis: '/api/goal-analysis',
        screening: '/api/screening',
        analysis: '/api/analysis',
        optimisation: '/api/optimisation',
        validation: '/api/validation',
        monitoring: '/api/monitoring'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Gro Investment Platform API running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API available at: http://localhost:${PORT}`);
  console.log(`🔧 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 API status: http://localhost:${PORT}/api/status`);
  console.log(`🎯 6-Stage Investment Pipeline Ready!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;