const jwt = require('jsonwebtoken');
const { asyncHandler } = require('./errorMiddleware');
const User = require('../models/User');

/**
 * Authentication Middleware
 * Features:
 * - JWT verification
 * - Token refresh
 * - Role-based access
 * - Session management
 */

/**
 * Protect routes - Authentication required
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Check for token in cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401);
      throw new Error('User account is deactivated');
    }

    // Check if user deleted
    if (user.deletedAt) {
      res.status(401);
      throw new Error('User account has been deleted');
    }

    // Check if password was changed after token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      res.status(401);
      throw new Error('Password recently changed. Please log in again');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }
});

/**
 * Optional auth - Attach user if token exists
 */
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.isActive && !user.deletedAt) {
        req.user = user;
      }
    } catch (error) {
      // Continue without user
    }
  }

  next();
});

/**
 * Restrict to specific roles
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error('You must be logged in to access this resource');
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`User role '${req.user.role}' is not authorized to access this route`);
    }

    next();
  };
};

/**
 * Check email verification
 */
const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error('You must be logged in');
  }

  if (!req.user.isEmailVerified) {
    res.status(403);
    throw new Error('Please verify your email to access this resource');
  }

  next();
};

/**
 * Check owner verification
 */
const requireOwnerVerification = (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error('You must be logged in');
  }

  if (req.user.role !== 'owner') {
    res.status(403);
    throw new Error('Only court owners can access this resource');
  }

  if (!req.user.ownerProfile || !req.user.ownerProfile.verified) {
    res.status(403);
    throw new Error('Your owner account must be verified to access this resource');
  }

  next();
};

/**
 * Rate limit by user
 */
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    if (!req.user) return next();

    const userId = req.user._id.toString();
    const now = Date.now();
    const userRequests = requests.get(userId) || [];

    // Filter out old requests
    const recentRequests = userRequests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      res.status(429);
      throw new Error('Too many requests. Please try again later.');
    }

    recentRequests.push(now);
    requests.set(userId, recentRequests);

    // Cleanup old entries
    if (requests.size > 10000) {
      const oldestAllowed = now - windowMs;
      for (const [key, times] of requests.entries()) {
        const validTimes = times.filter(time => time > oldestAllowed);
        if (validTimes.length === 0) {
          requests.delete(key);
        } else {
          requests.set(key, validTimes);
        }
      }
    }

    next();
  };
};

/**
 * Check if user owns resource
 */
const checkOwnership = (Model, paramName = 'id') => {
  return asyncHandler(async (req, res, next) => {
    const resource = await Model.findById(req.params[paramName]);

    if (!resource) {
      res.status(404);
      throw new Error('Resource not found');
    }

    // Admin can access anything
    if (req.user.role === 'admin') {
      return next();
    }

    // Check ownership
    const ownerId = resource.user || resource.owner || resource.createdBy;
    if (!ownerId || ownerId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You do not have permission to access this resource');
    }

    next();
  });
};

module.exports = {
  protect,
  optionalAuth,
  restrictTo,
  authorize: restrictTo, // Alias for restrictTo
  requireEmailVerification,
  requireOwnerVerification,
  userRateLimit,
  checkOwnership
};
