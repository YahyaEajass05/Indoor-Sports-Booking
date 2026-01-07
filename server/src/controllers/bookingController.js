const { asyncHandler } = require('../middleware/errorMiddleware');
const Booking = require('../models/Booking');
const Court = require('../models/Court');
const User = require('../models/User');
const { checkAvailability, calculatePrice } = require('../services/bookingService');
const { sendBookingConfirmation, sendBookingCancellation } = require('../config/mailer');

/**
 * Booking Controller
 * Handles booking operations
 */

/**
 * @desc    Create new booking
 * @route   POST /api/v1/bookings
 * @access  Private
 */
const createBooking = asyncHandler(async (req, res) => {
  const { courtId, date, startTime, endTime, duration, paymentMethod, notes } = req.body;

  // Validate required fields
  if (!courtId || !date || !startTime || !endTime || !duration) {
    res.status(400);
    throw new Error('Please provide all required booking details');
  }

  // Check if court exists and is approved
  const court = await Court.findById(courtId);
  if (!court) {
    res.status(404);
    throw new Error('Court not found');
  }
  
  if (court.status !== 'approved') {
    res.status(400);
    throw new Error('Court is not available for booking');
  }
  
  if (court.deletedAt) {
    res.status(404);
    throw new Error('Court not found');
  }

  // Check availability
  const availability = await checkAvailability(courtId, date, startTime, endTime);
  if (!availability.available) {
    res.status(409);
    throw new Error(`Time slot not available. Conflicts with booking: ${availability.conflict.bookingId}`);
  }

  // Calculate pricing
  const pricing = await calculatePrice(courtId, date, startTime, endTime, duration);

  // Create booking
  const booking = await Booking.create({
    user: req.user._id,
    court: courtId,
    date,
    startTime,
    endTime,
    duration,
    pricing,
    totalAmount: pricing.totalAmount,
    payment: {
      method: paymentMethod || 'card',
      status: 'pending'
    },
    notes,
    status: 'pending'
  });

  // Populate references
  await booking.populate('court user');

  // Update court statistics
  court.stats.totalBookings += 1;
  await court.save({ validateBeforeSave: false });

  // Update user statistics
  const user = await User.findById(req.user._id);
  user.stats.totalBookings += 1;
  await user.save({ validateBeforeSave: false });

  // Send confirmation email
  try {
    await sendBookingConfirmation(user, booking, court);
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
  }

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: booking
  });
});

/**
 * @desc    Get all bookings for current user
 * @route   GET /api/v1/bookings
 * @access  Private
 */
const getUserBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const query = {
    user: req.user._id,
    deletedAt: { $exists: false }
  };

  if (status) {
    query.status = status;
  }

  const bookings = await Booking.find(query)
    .populate('court', 'name sport location pricing images')
    .sort({ date: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Booking.countDocuments(query);

  res.json({
    success: true,
    data: bookings,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

/**
 * @desc    Get single booking
 * @route   GET /api/v1/bookings/:id
 * @access  Private
 */
const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('court')
    .populate('user', 'name email phone');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check ownership (user can only see their own bookings unless admin/owner)
  if (req.user.role === 'user' && booking.user._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this booking');
  }

  res.json({
    success: true,
    data: booking
  });
});

/**
 * @desc    Cancel booking
 * @route   PUT /api/v1/bookings/:id/cancel
 * @access  Private
 */
const cancelBooking = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const booking = await Booking.findById(req.params.id)
    .populate('court')
    .populate('user');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check ownership
  if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to cancel this booking');
  }

  // Check if already cancelled
  if (booking.status === 'cancelled') {
    res.status(400);
    throw new Error('Booking is already cancelled');
  }

  // Check if can be cancelled
  if (!booking.canBeCancelled) {
    res.status(400);
    throw new Error('Booking cannot be cancelled. Cancellation deadline has passed.');
  }

  // Calculate refund
  const refundInfo = booking.calculateRefund();

  // Update booking
  booking.status = 'cancelled';
  booking.cancellation = {
    cancelledAt: new Date(),
    cancelledBy: req.user._id,
    reason,
    refundEligible: refundInfo.eligible,
    refundPercentage: refundInfo.percentage
  };
  
  if (refundInfo.eligible && booking.payment.status === 'completed') {
    booking.payment.refundAmount = refundInfo.amount;
  }
  
  await booking.save();

  // Update statistics
  const court = await Court.findById(booking.court._id);
  court.stats.cancelledBookings += 1;
  await court.save({ validateBeforeSave: false });

  const user = await User.findById(booking.user._id);
  user.stats.cancelledBookings += 1;
  await user.save({ validateBeforeSave: false });

  // Send cancellation email
  try {
    await sendBookingCancellation(booking.user, booking, booking.court, refundInfo.amount);
  } catch (error) {
    console.error('Error sending cancellation email:', error);
  }

  res.json({
    success: true,
    message: 'Booking cancelled successfully',
    data: {
      booking,
      refund: refundInfo
    }
  });
});

/**
 * @desc    Get available slots
 * @route   GET /api/v1/bookings/availability/:courtId
 * @access  Public
 */
const getCourtAvailability = asyncHandler(async (req, res) => {
  const { courtId } = req.params;
  const { date } = req.query;

  if (!date) {
    res.status(400);
    throw new Error('Date is required');
  }

  const result = await getAvailableSlots(courtId, date);

  res.json({
    success: true,
    data: result
  });
});

/**
 * @desc    Update booking
 * @route   PUT /api/v1/bookings/:id
 * @access  Private
 */
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check ownership
  if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update this booking');
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Booking updated successfully',
    data: updatedBooking
  });
});

/**
 * @desc    Get available slots for a court
 * @route   GET /api/v1/bookings/courts/:courtId/available-slots
 * @access  Public
 */
const getAvailableSlots = asyncHandler(async (req, res) => {
  const { courtId } = req.params;
  const { date } = req.query;

  if (!date) {
    res.status(400);
    throw new Error('Date is required');
  }

  const court = await Court.findById(courtId);
  if (!court) {
    res.status(404);
    throw new Error('Court not found');
  }

  const bookings = await Booking.find({
    court: courtId,
    date: new Date(date),
    status: { $in: ['pending', 'confirmed'] }
  }).select('startTime endTime');

  // Get court operating hours
  const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'lowercase' });
  const daySchedule = court.availability.weeklySchedule.find(s => s.day === dayOfWeek);

  if (!daySchedule || !daySchedule.isOpen) {
    return res.json({
      success: true,
      data: { availableSlots: [], message: 'Court is closed on this day' }
    });
  }

  // Generate available slots (simplified version)
  const slots = [];
  const openTime = daySchedule.openTime;
  const closeTime = daySchedule.closeTime;

  res.json({
    success: true,
    data: {
      courtId,
      date,
      operatingHours: { openTime, closeTime },
      bookedSlots: bookings,
      availableSlots: slots
    }
  });
});

/**
 * @desc    Check slot availability
 * @route   POST /api/v1/bookings/courts/:courtId/check-availability
 * @access  Public
 */
const checkSlotAvailability = asyncHandler(async (req, res) => {
  const { courtId } = req.params;
  const { date, startTime, endTime } = req.body;

  if (!date || !startTime || !endTime) {
    res.status(400);
    throw new Error('Date, start time, and end time are required');
  }

  const conflict = await Booking.findOne({
    court: courtId,
    date: new Date(date),
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
    ]
  });

  res.json({
    success: true,
    data: {
      available: !conflict,
      conflict: conflict ? { startTime: conflict.startTime, endTime: conflict.endTime } : null
    }
  });
});

/**
 * @desc    Get booking statistics
 * @route   GET /api/v1/bookings/stats
 * @access  Private
 */
const getBookingStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [total, upcoming, completed, cancelled] = await Promise.all([
    Booking.countDocuments({ user: userId }),
    Booking.countDocuments({ user: userId, status: 'confirmed', date: { $gte: new Date() } }),
    Booking.countDocuments({ user: userId, status: 'completed' }),
    Booking.countDocuments({ user: userId, status: 'cancelled' })
  ]);

  res.json({
    success: true,
    data: {
      total,
      upcoming,
      completed,
      cancelled
    }
  });
});

module.exports = {
  createBooking,
  getUserBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  getAvailableSlots,
  checkSlotAvailability,
  getBookingStats
};
