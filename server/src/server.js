require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error('Error:', err.name, err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
let server;

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Start Express server
    server = app.listen(PORT, () => {
      console.log('');
      console.log('════════════════════════════════════════════');
      console.log('🚀 SERVER STARTED SUCCESSFULLY');
      console.log('════════════════════════════════════════════');
      console.log(`⚡ Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 Server: http://localhost:${PORT}`);
      console.log(`📡 API: http://localhost:${PORT}/api/${process.env.API_VERSION || 'v1'}`);
      console.log(`📚 Docs: http://localhost:${PORT}/api-docs`);
      console.log(`💾 Database: Connected`);
      console.log('════════════════════════════════════════════');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Server startup error:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error('Error:', err.name, err.message);
  
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('✅ Process terminated');
      process.exit(0);
    });
  }
});

// Start the server
startServer();

module.exports = server;
