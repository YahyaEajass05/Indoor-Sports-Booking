const { asyncHandler } = require('./errorMiddleware');
const Court = require('../models/Court');

/**
 * Owner Middleware
 * Handles court ownership verification
 */

/**
 * Check if user owns the court
 * Used for routes that modify court data
 */
const isOwner = asyncHandler(async (req, res, next) => {
  const courtId = req.params.id;
  
  if (!courtId) {
    res.status(400);
    throw new Error('Court ID is required');
  }

  const court = await Court.findById(courtId);

  if (!court) {
    res.status(404);
    throw new Error('Court not found');
  }

  // Admin can access everything
  if (req.user.role === 'admin') {
    return next();
  }

  // Check if user is the owner
  if (court.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You do not have permission to access this court');
  }

  // Attach court to request for further use
  req.court = court;
  next();
});

/**
 * Check if user owns any courts
 */
const hasAnyCourts = asyncHandler(async (req, res, next) => {
  const courtCount = await Court.countDocuments({ 
    owner: req.user._id,
    deletedAt: { $exists: false }
  });

  if (courtCount === 0) {
    res.status(403);
    throw new Error('You need to register at least one court to access this resource');
  }

  next();
});

module.exports = {
  isOwner,
  hasAnyCourts
};
