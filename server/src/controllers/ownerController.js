const { asyncHandler } = require('../middleware/errorMiddleware');
const Court = require('../models/Court');
const Booking = require('../models/Booking');
const Payout = require('../models/Payout');

/**
 * Owner Controller
 * Handles court owner operations
 */

/**
 * @desc    Get owner dashboard statistics
 * @route   GET /api/v1/owner/dashboard
 * @access  Private/Owner
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  const [
    totalCourts,
    totalBookings,
    activeBookings,
    revenue
  ] = await Promise.all([
    Court.countDocuments({ owner: ownerId, deletedAt: { $exists: false } }),
    Booking.countDocuments({ owner: ownerId }),
    Booking.countDocuments({ owner: ownerId, status: 'confirmed' }),
    Booking.aggregate([
      { $match: { owner: ownerId, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ])
  ]);

  const recentBookings = await Booking.find({ owner: ownerId })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email')
    .populate('court', 'name');

  res.json({
    success: true,
    data: {
      stats: {
        totalCourts,
        totalBookings,
        activeBookings,
        totalRevenue: revenue[0]?.total || 0
      },
      recentBookings
    }
  });
});

/**
 * @desc    Get owner's courts
 * @route   GET /api/v1/owner/courts
 * @access  Private/Owner
 */
const getMyCourts = asyncHandler(async (req, res) => {
  const courts = await Court.find({ 
    owner: req.user._id,
    deletedAt: { $exists: false }
  }).sort({ createdAt: -1 });

  res.json({
    success: true,
    data: courts
  });
});

/**
 * @desc    Create court
 * @route   POST /api/v1/owner/courts
 * @access  Private/Owner
 */
const createCourt = asyncHandler(async (req, res) => {
  const courtData = {
    ...req.body,
    owner: req.user._id
  };

  const court = await Court.create(courtData);

  res.status(201).json({
    success: true,
    message: 'Court created successfully',
    data: court
  });
});

/**
 * @desc    Update court
 * @route   PUT /api/v1/owner/courts/:id
 * @access  Private/Owner
 */
const updateCourt = asyncHandler(async (req, res) => {
  const court = await Court.findById(req.params.id);

  if (!court) {
    res.status(404);
    throw new Error('Court not found');
  }

  const updatedCourt = await Court.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Court updated successfully',
    data: updatedCourt
  });
});

/**
 * @desc    Delete court
 * @route   DELETE /api/v1/owner/courts/:id
 * @access  Private/Owner
 */
const deleteCourt = asyncHandler(async (req, res) => {
  const court = await Court.findById(req.params.id);

  if (!court) {
    res.status(404);
    throw new Error('Court not found');
  }

  court.deletedAt = new Date();
  court.deletedBy = req.user._id;
  await court.save();

  res.json({
    success: true,
    message: 'Court deleted successfully'
  });
});

/**
 * @desc    Get court bookings
 * @route   GET /api/v1/owner/courts/:id/bookings
 * @access  Private/Owner
 */
const getCourtBookings = asyncHandler(async (req, res) => {
  const { status, startDate, endDate } = req.query;

  const query = { court: req.params.id };
  if (status) query.status = status;
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const bookings = await Booking.find(query)
    .populate('user', 'name email phone')
    .sort({ date: -1, startTime: -1 });

  res.json({
    success: true,
    data: bookings
  });
});

/**
 * @desc    Update booking status
 * @route   PATCH /api/v1/owner/bookings/:id/status
 * @access  Private/Owner
 */
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Verify ownership
  const court = await Court.findById(booking.court);
  if (court.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this booking');
  }

  booking.status = status;
  await booking.save();

  res.json({
    success: true,
    message: 'Booking status updated',
    data: booking
  });
});

/**
 * @desc    Get revenue report
 * @route   GET /api/v1/owner/revenue
 * @access  Private/Owner
 */
const getRevenue = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const matchQuery = { 
    owner: req.user._id,
    status: 'completed'
  };

  if (startDate || endDate) {
    matchQuery.date = {};
    if (startDate) matchQuery.date.$gte = new Date(startDate);
    if (endDate) matchQuery.date.$lte = new Date(endDate);
  }

  const revenue = await Booking.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        totalRevenue: { $sum: '$totalAmount' },
        bookingCount: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const totalRevenue = revenue.reduce((sum, day) => sum + day.totalRevenue, 0);

  res.json({
    success: true,
    data: {
      dailyRevenue: revenue,
      totalRevenue,
      totalBookings: revenue.reduce((sum, day) => sum + day.bookingCount, 0)
    }
  });
});

/**
 * @desc    Get payouts
 * @route   GET /api/v1/owner/payouts
 * @access  Private/Owner
 */
const getPayouts = asyncHandler(async (req, res) => {
  const payouts = await Payout.find({ owner: req.user._id })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: payouts
  });
});

/**
 * @desc    Request payout
 * @route   POST /api/v1/owner/payouts/request
 * @access  Private/Owner
 */
const requestPayout = asyncHandler(async (req, res) => {
  const { startDate, endDate, paymentMethod, paymentDetails } = req.body;

  // Calculate payout
  const payoutData = await Payout.calculateOwnerPayout(
    req.user._id,
    new Date(startDate),
    new Date(endDate)
  );

  if (payoutData.netAmount <= 0) {
    res.status(400);
    throw new Error('No revenue available for payout');
  }

  const payout = await Payout.create({
    owner: req.user._id,
    amount: payoutData.netAmount,
    period: { startDate, endDate },
    bookings: payoutData.bookings,
    totalBookings: payoutData.totalBookings,
    totalRevenue: payoutData.totalRevenue,
    platformFee: payoutData.platformFee,
    netAmount: payoutData.netAmount,
    paymentMethod,
    paymentDetails
  });

  res.status(201).json({
    success: true,
    message: 'Payout request submitted',
    data: payout
  });
});

/**
 * @desc    Update court availability
 * @route   PUT /api/v1/owner/courts/:id/availability
 * @access  Private/Owner
 */
const updateAvailability = asyncHandler(async (req, res) => {
  const court = await Court.findById(req.params.id);

  if (!court) {
    res.status(404);
    throw new Error('Court not found');
  }

  const { availability } = req.body;
  court.availability = availability;
  await court.save();

  res.json({
    success: true,
    message: 'Availability updated successfully',
    data: court
  });
});

/**
 * @desc    Get analytics
 * @route   GET /api/v1/owner/analytics
 * @access  Private/Owner
 */
const getAnalytics = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  // Get booking trends
  const bookingTrends = await Booking.aggregate([
    { $match: { owner: ownerId } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
        count: { $sum: 1 },
        revenue: { $sum: '$totalAmount' }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Get popular courts
  const popularCourts = await Booking.aggregate([
    { $match: { owner: ownerId } },
    {
      $group: {
        _id: '$court',
        bookingCount: { $sum: 1 },
        revenue: { $sum: '$totalAmount' }
      }
    },
    { $sort: { bookingCount: -1 } },
    { $limit: 5 }
  ]);

  // Populate court details
  await Court.populate(popularCourts, { path: '_id', select: 'name sport' });

  res.json({
    success: true,
    data: {
      bookingTrends,
      popularCourts
    }
  });
});

module.exports = {
  getDashboardStats,
  getMyCourts,
  createCourt,
  updateCourt,
  deleteCourt,
  getCourtBookings,
  updateBookingStatus,
  getRevenue,
  getPayouts,
  requestPayout,
  updateAvailability,
  getAnalytics
};
