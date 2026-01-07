const { asyncHandler } = require('../middleware/errorMiddleware');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Court = require('../models/Court');
const Promotion = require('../models/Promotion');
const AuditLog = require('../models/AuditLog');
const Payout = require('../models/Payout');

/**
 * Admin Controller
 * Handles admin dashboard and management operations
 */

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/v1/admin/dashboard
 * @access  Private/Admin
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalCourts,
    totalBookings,
    totalRevenue,
    activeBookings,
    pendingCourts
  ] = await Promise.all([
    User.countDocuments({ deletedAt: { $exists: false } }),
    Court.countDocuments({ deletedAt: { $exists: false } }),
    Booking.countDocuments(),
    Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
    Booking.countDocuments({ status: 'confirmed' }),
    Court.countDocuments({ status: 'pending' })
  ]);

  // Get recent activity
  const recentBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email')
    .populate('court', 'name');

  const recentUsers = await User.find({ deletedAt: { $exists: false } })
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name email role createdAt');

  res.json({
    success: true,
    data: {
      stats: {
        totalUsers,
        totalCourts,
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        activeBookings,
        pendingCourts
      },
      recentBookings,
      recentUsers
    }
  });
});

/**
 * @desc    Get all users
 * @route   GET /api/v1/admin/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, role, search, status } = req.query;

  const query = { deletedAt: { $exists: false } };
  
  if (role) query.role = role;
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await User.countDocuments(query);

  res.json({
    success: true,
    data: users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
});

/**
 * @desc    Get user by ID
 * @route   GET /api/v1/admin/users/:id
 * @access  Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Get user's bookings and courts
  const [bookings, courts] = await Promise.all([
    Booking.find({ user: user._id }).sort({ createdAt: -1 }).limit(10),
    Court.find({ owner: user._id })
  ]);

  res.json({
    success: true,
    data: {
      user,
      bookings,
      courts
    }
  });
});

/**
 * @desc    Update user
 * @route   PUT /api/v1/admin/users/:id
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  const { role, status, isEmailVerified } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (role) user.role = role;
  if (status) user.status = status;
  if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified;

  await user.save();

  // Log the action
  await AuditLog.log({
    user: req.user._id,
    action: 'user_update',
    entityType: 'user',
    entityId: user._id,
    metadata: { updatedFields: req.body }
  });

  res.json({
    success: true,
    message: 'User updated successfully',
    data: user.toSafeObject()
  });
});

/**
 * @desc    Delete user
 * @route   DELETE /api/v1/admin/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.softDelete(req.user._id);

  // Log the action
  await AuditLog.log({
    user: req.user._id,
    action: 'user_delete',
    entityType: 'user',
    entityId: user._id
  });

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

/**
 * @desc    Get all bookings
 * @route   GET /api/v1/admin/bookings
 * @access  Private/Admin
 */
const getAllBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, sport } = req.query;

  const query = {};
  if (status) query.status = status;
  if (sport) query.sport = sport;

  const bookings = await Booking.find(query)
    .populate('user', 'name email')
    .populate('court', 'name location')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await Booking.countDocuments(query);

  res.json({
    success: true,
    data: bookings,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
});

/**
 * @desc    Get all courts
 * @route   GET /api/v1/admin/courts
 * @access  Private/Admin
 */
const getAllCourts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, approvalStatus } = req.query;

  const query = { deletedAt: { $exists: false } };
  if (status) query.status = status;
  if (approvalStatus) query.status = approvalStatus;

  const courts = await Court.find(query)
    .populate('owner', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await Court.countDocuments(query);

  res.json({
    success: true,
    data: courts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
});

/**
 * @desc    Approve court
 * @route   PATCH /api/v1/admin/courts/:id/approve
 * @access  Private/Admin
 */
const approveCourt = asyncHandler(async (req, res) => {
  const court = await Court.findById(req.params.id);

  if (!court) {
    res.status(404);
    throw new Error('Court not found');
  }

  court.status = 'approved';
  court.approvedBy = req.user._id;
  court.approvedAt = new Date();
  await court.save();

  res.json({
    success: true,
    message: 'Court approved successfully',
    data: court
  });
});

/**
 * @desc    Reject court
 * @route   PATCH /api/v1/admin/courts/:id/reject
 * @access  Private/Admin
 */
const rejectCourt = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const court = await Court.findById(req.params.id);

  if (!court) {
    res.status(404);
    throw new Error('Court not found');
  }

  court.status = 'rejected';
  court.rejectionReason = reason;
  await court.save();

  res.json({
    success: true,
    message: 'Court rejected successfully',
    data: court
  });
});

/**
 * @desc    Get all promotions
 * @route   GET /api/v1/admin/promotions
 * @access  Private/Admin
 */
const getAllPromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.find()
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: promotions
  });
});

/**
 * @desc    Get audit logs
 * @route   GET /api/v1/admin/audit-logs
 * @access  Private/Admin
 */
const getAuditLogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, action, userId } = req.query;

  const query = {};
  if (action) query.action = action;
  if (userId) query.user = userId;

  const logs = await AuditLog.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await AuditLog.countDocuments(query);

  res.json({
    success: true,
    data: logs,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
});

/**
 * @desc    Get system settings
 * @route   GET /api/v1/admin/settings
 * @access  Private/Admin
 */
const getSystemSettings = asyncHandler(async (req, res) => {
  // This would typically come from a Settings model
  const settings = {
    bookingBufferMinutes: process.env.BOOKING_BUFFER_MINUTES || 15,
    cancellationDeadlineHours: process.env.CANCELLATION_DEADLINE_HOURS || 24,
    refundPercentage: process.env.REFUND_PERCENTAGE || 80,
    platformFeePercentage: process.env.PLATFORM_FEE_PERCENTAGE || 10
  };

  res.json({
    success: true,
    data: settings
  });
});

/**
 * @desc    Update system settings
 * @route   PUT /api/v1/admin/settings
 * @access  Private/Admin
 */
const updateSystemSettings = asyncHandler(async (req, res) => {
  // This would update a Settings model
  res.json({
    success: true,
    message: 'Settings updated successfully',
    data: req.body
  });
});

/**
 * @desc    Get revenue report
 * @route   GET /api/v1/admin/reports/revenue
 * @access  Private/Admin
 */
const getRevenueReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const matchQuery = { status: 'completed' };
  if (startDate || endDate) {
    matchQuery.date = {};
    if (startDate) matchQuery.date.$gte = new Date(startDate);
    if (endDate) matchQuery.date.$lte = new Date(endDate);
  }

  const revenue = await Booking.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalAmount' },
        totalBookings: { $sum: 1 },
        averageBookingValue: { $avg: '$totalAmount' }
      }
    }
  ]);

  res.json({
    success: true,
    data: revenue[0] || { totalRevenue: 0, totalBookings: 0, averageBookingValue: 0 }
  });
});

/**
 * @desc    Export data
 * @route   POST /api/v1/admin/export/:type
 * @access  Private/Admin
 */
const exportData = asyncHandler(async (req, res) => {
  const { type } = req.params;

  // This would generate CSV/Excel export
  res.json({
    success: true,
    message: `${type} data export initiated`,
    data: { exportType: type }
  });
});

module.exports = {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllBookings,
  getAllCourts,
  approveCourt,
  rejectCourt,
  getAllPromotions,
  getAuditLogs,
  getSystemSettings,
  updateSystemSettings,
  getRevenueReport,
  exportData
};
