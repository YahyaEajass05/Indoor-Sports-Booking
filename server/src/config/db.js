const mongoose = require('mongoose');

/**
 * Database Configuration and Connection
 * Features:
 * - Automatic reconnection
 * - Connection pooling
 * - Error handling
 * - Event logging
 * - Graceful shutdown
 */

const connectDB = async () => {
  try {
    const options = {
      // Connection pool settings
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      
      // Retry settings
      retryWrites: true,
      retryReads: true,
      
      // Monitoring
      autoIndex: process.env.NODE_ENV === 'development',
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);

    // Connection event handlers
    mongoose.connection.on('connected', () => {
      console.log('🟢 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 Mongoose disconnected from MongoDB');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🛑 MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('Stack:', error.stack);
    
    // Retry connection after 5 seconds
    console.log('🔄 Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

/**
 * Check database connection health
 */
const checkConnection = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };
  
  return {
    isConnected: state === 1,
    state: states[state],
    host: mongoose.connection.host,
    name: mongoose.connection.name
  };
};

/**
 * Get database statistics
 */
const getDBStats = async () => {
  try {
    const stats = await mongoose.connection.db.stats();
    return {
      database: stats.db,
      collections: stats.collections,
      dataSize: `${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`,
      storageSize: `${(stats.storageSize / 1024 / 1024).toFixed(2)} MB`,
      indexes: stats.indexes,
      objects: stats.objects
    };
  } catch (error) {
    console.error('Error fetching DB stats:', error);
    return null;
  }
};

/**
 * Close database connection
 */
const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed successfully');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
  }
};

module.exports = {
  connectDB,
  checkConnection,
  getDBStats,
  closeConnection
};
