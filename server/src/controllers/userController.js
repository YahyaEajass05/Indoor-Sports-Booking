const { asyncHandler } = require('../middleware/errorMiddleware');
const User = require('../models/User');

/**
 * User Controller
 * Handles user profile management and user-related operations
 */

/**
 * @desc    Get user profile
 * @route   GET /api/v1/users/profile
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    success: true,
    data: user.toSafeObject(),
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/v1/users/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ['name', 'phone', 'dateOfBirth', 'gender', 'address', 'preferences'];
  const updates = {};

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: user.toSafeObject(),
  });
});

/**
 * @desc    Delete user account
 * @route   DELETE /api/v1/users/account
 * @access  Private
 */
const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error('Password is required to delete account');
  }

  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error('Incorrect password');
  }

  await user.softDelete(req.user._id);

  res.json({
    success: true,
    message: 'Account deleted successfully',
  });
});

/**
 * @desc    Get user statistics
 * @route   GET /api/v1/users/stats
 * @access  Private
 */
const getUserStats = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    success: true,
    data: {
      stats: user.stats,
      accountAge: user.accountAge,
      memberSince: user.createdAt,
    },
  });
});

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
  getUserStats,
};
