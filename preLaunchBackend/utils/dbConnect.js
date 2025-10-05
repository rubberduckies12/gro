const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connections[0].readyState) {
      console.log('MongoDB already connected');
      return;
    }

    // MongoDB connection string from environment variables
    const mongoURI = process.env.MONGODB_URI;

    // Check if MONGODB_URI is defined - FIXED: Safe handling
    if (!mongoURI) {
      console.error('❌ MONGODB_URI environment variable is not defined');
      console.log('🔍 Available environment variables:', Object.keys(process.env).filter(key => key.includes('MONGO')));
      throw new Error('MONGODB_URI environment variable is not defined. Please set it in your deployment environment.');
    }

    // Connection options
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      family: 4,
      retryWrites: true,
      retryReads: true,
    };

    console.log('🔌 Attempting to connect to MongoDB Atlas...');
    // Safe string replacement - FIXED: Check if mongoURI exists before calling replace
    const maskedURI = mongoURI ? mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') : 'undefined';
    console.log('🔗 Connection string:', maskedURI);

    // Connect to MongoDB with timeout
    const connectWithTimeout = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Connection timeout after 15 seconds'));
      }, 15000);

      mongoose.connect(mongoURI, options)
        .then(() => {
          clearTimeout(timeout);
          resolve();
        })
        .catch((err) => {
          clearTimeout(timeout);
          reject(err);
        });
    });

    await connectWithTimeout;

    console.log('✅ MongoDB connected successfully');
    console.log('📊 Connected to database:', mongoose.connection.db.databaseName);

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('📡 Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📡 Mongoose disconnected from MongoDB Atlas');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Mongoose reconnected to MongoDB Atlas');
    });

    // Handle app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('📡 MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    // Debug environment variables
    console.log('🔍 Environment variables debug:');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('PORT:', process.env.PORT);
    console.log('MONGODB_URI defined:', !!process.env.MONGODB_URI);
    
    console.error('🔍 Full error details:', error);
    
    // Don't exit in development, but do in production
    if (process.env.NODE_ENV === 'production') {
      console.log('💡 This is a production environment. Exiting...');
      process.exit(1);
    }
  }
};

// Function to disconnect from database (useful for testing)
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('📡 MongoDB disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error.message);
  }
};

// Check connection status
const getConnectionStatus = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[state] || 'unknown';
};

module.exports = {
  connectDB,
  disconnectDB,
  getConnectionStatus
};