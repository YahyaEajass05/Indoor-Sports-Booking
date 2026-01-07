const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');

// Import routes
const userRoutes = require('./routes/userRoutes');
const courtRoutes = require('./routes/courtRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Import middleware
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Initialize Express app
const app = express();

/**
 * ═══════════════════════════════════════════
 * SECURITY & MIDDLEWARE CONFIGURATION
 * ═══════════════════════════════════════════
 */

// Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Enable CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL injection (disabled for Express 5 compatibility)
// app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp({
  whitelist: ['price', 'rating', 'duration', 'sport', 'amenities']
}));

// Compress all responses
app.use(compression());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later.',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

// Apply rate limiting to all routes
app.use('/api/', limiter);

// Strict rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true
});

app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);
app.use('/api/v1/auth/forgot-password', authLimiter);

/**
 * ═══════════════════════════════════════════
 * ROUTES
 * ═══════════════════════════════════════════
 */

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime()
  });
});

// Favicon handler (prevents 404 errors from browsers)
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No Content
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'CourtBooker API',
    version: process.env.API_VERSION || 'v1',
    documentation: `${req.protocol}://${req.get('host')}/api-docs`,
    endpoints: {
      health: '/health',
      users: '/api/v1/users',
      auth: '/api/v1/auth',
      courts: '/api/v1/courts',
      bookings: '/api/v1/bookings',
      admin: '/api/v1/admin',
      owner: '/api/v1/owner',
    }
  });
});

// Mount routers
const API_VERSION = process.env.API_VERSION || 'v1';
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/courts`, courtRoutes);
app.use(`/api/${API_VERSION}/admin`, adminRoutes);
app.use(`/api/${API_VERSION}/owner`, ownerRoutes);
app.use(`/api/${API_VERSION}/bookings`, bookingRoutes);
app.use(`/api/${API_VERSION}/promotions`, promotionRoutes);
app.use(`/api/${API_VERSION}/notifications`, notificationRoutes);

/**
 * ═══════════════════════════════════════════
 * ERROR HANDLING
 * ═══════════════════════════════════════════
 */

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
