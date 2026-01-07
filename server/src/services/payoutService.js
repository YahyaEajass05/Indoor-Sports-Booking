const Payout = require('../models/Payout');
const Booking = require('../models/Booking');
const User = require('../models/User');
const mongoose = require('mongoose');

/**
 * Payout Service
 * Owner payment processing and management
 */

/**
 * Calculate owner payout for a period
 */
const calculateOwnerPayout = async (ownerId, startDate, endDate) => {
  const bookings = await Booking.find({
    owner: ownerId,
    status: 'completed',
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    },
    payoutProcessed: { $ne: true }
  });

  if (bookings.length === 0) {
    return {
      totalBookings: 0,
      totalRevenue: 0,
      platformFee: 0,
      netAmount: 0,
      bookings: []
    };
  }

  let totalRevenue = 0;
  const bookingDetails = [];

  const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;

  bookings.forEach(booking => {
    const bookingAmount = booking.totalAmount || 0;
    const commission = (bookingAmount * platformFeePercentage) / 100;
    const netAmount = bookingAmount - commission;

    totalRevenue += bookingAmount;
    bookingDetails.push({
      booking: booking._id,
      bookingId: booking.bookingId,
      date: booking.date,
      amount: bookingAmount,
      commission,
      netAmount
    });
  });

  const platformFee = (totalRevenue * platformFeePercentage) / 100;
  const netAmount = totalRevenue - platformFee;

  return {
    totalBookings: bookings.length,
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    platformFee: parseFloat(platformFee.toFixed(2)),
    netAmount: parseFloat(netAmount.toFixed(2)),
    bookings: bookingDetails
  };
};

/**
 * Create payout request
 */
const createPayoutRequest = async (ownerId, payoutData) => {
  const { startDate, endDate, paymentMethod, paymentDetails } = payoutData;

  // Calculate payout
  const payoutCalculation = await calculateOwnerPayout(ownerId, startDate, endDate);

  if (payoutCalculation.netAmount <= 0) {
    throw new Error('No revenue available for payout');
  }

  // Create payout record
  const payout = await Payout.create({
    owner: ownerId,
    amount: payoutCalculation.netAmount,
    currency: 'USD',
    period: {
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    },
    bookings: payoutCalculation.bookings,
    totalBookings: payoutCalculation.totalBookings,
    totalRevenue: payoutCalculation.totalRevenue,
    platformFee: payoutCalculation.platformFee,
    netAmount: payoutCalculation.netAmount,
    status: 'pending',
    paymentMethod,
    paymentDetails
  });

  // Mark bookings as payout processed
  const bookingIds = payoutCalculation.bookings.map(b => b.booking);
  await Booking.updateMany(
    { _id: { $in: bookingIds } },
    { $set: { payoutProcessed: true, payoutId: payout._id } }
  );

  return payout;
};

/**
 * Process payout (admin action)
 */
const processPayout = async (payoutId, transactionId, adminId) => {
  const payout = await Payout.findById(payoutId);

  if (!payout) {
    throw new Error('Payout not found');
  }

  if (payout.status !== 'pending') {
    throw new Error(`Payout cannot be processed. Current status: ${payout.status}`);
  }

  payout.status = 'processing';
  await payout.save();

  try {
    // Here you would integrate with payment gateway (Stripe, PayPal, etc.)
    // For now, we'll simulate the process
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mark as completed
    payout.status = 'completed';
    payout.processedAt = new Date();
    payout.transactionId = transactionId;
    payout.metadata = {
      ...payout.metadata,
      processedBy: adminId,
      processedAt: new Date()
    };
    await payout.save();

    // Update owner statistics
    const owner = await User.findById(payout.owner);
    if (owner && owner.ownerProfile) {
      owner.ownerProfile.totalPayouts = (owner.ownerProfile.totalPayouts || 0) + 1;
      owner.ownerProfile.totalEarnings = (owner.ownerProfile.totalEarnings || 0) + payout.netAmount;
      owner.ownerProfile.lastPayoutDate = new Date();
      await owner.save();
    }

    return payout;
  } catch (error) {
    payout.status = 'failed';
    payout.failureReason = error.message;
    await payout.save();
    throw error;
  }
};

/**
 * Get owner payouts
 */
const getOwnerPayouts = async (ownerId, filters = {}) => {
  const query = { owner: ownerId };

  if (filters.status) query.status = filters.status;
  if (filters.startDate) {
    query['period.startDate'] = { $gte: new Date(filters.startDate) };
  }
  if (filters.endDate) {
    query['period.endDate'] = { $lte: new Date(filters.endDate) };
  }

  return Payout.find(query)
    .sort({ createdAt: -1 })
    .lean();
};

/**
 * Get pending payouts (admin)
 */
const getPendingPayouts = async () => {
  return Payout.find({ status: 'pending' })
    .populate('owner', 'name email ownerProfile')
    .sort({ createdAt: 1 })
    .lean();
};

/**
 * Get payout statistics for owner
 */
const getOwnerPayoutStats = async (ownerId) => {
  const stats = await Payout.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(ownerId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$netAmount' }
      }
    }
  ]);

  const totalStats = await Payout.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(ownerId) } },
    {
      $group: {
        _id: null,
        totalPayouts: { $sum: 1 },
        totalEarnings: { $sum: '$netAmount' },
        totalRevenue: { $sum: '$totalRevenue' },
        totalPlatformFees: { $sum: '$platformFee' }
      }
    }
  ]);

  return {
    statusBreakdown: stats,
    totals: totalStats[0] || {
      totalPayouts: 0,
      totalEarnings: 0,
      totalRevenue: 0,
      totalPlatformFees: 0
    }
  };
};

/**
 * Cancel payout request
 */
const cancelPayoutRequest = async (payoutId, reason, userId) => {
  const payout = await Payout.findById(payoutId);

  if (!payout) {
    throw new Error('Payout not found');
  }

  if (payout.status !== 'pending') {
    throw new Error(`Cannot cancel payout with status: ${payout.status}`);
  }

  payout.status = 'cancelled';
  payout.failureReason = reason;
  payout.metadata = {
    ...payout.metadata,
    cancelledBy: userId,
    cancelledAt: new Date(),
    cancellationReason: reason
  };
  await payout.save();

  // Unmark bookings as payout processed
  const bookingIds = payout.bookings.map(b => b.booking);
  await Booking.updateMany(
    { _id: { $in: bookingIds } },
    { $unset: { payoutProcessed: '', payoutId: '' } }
  );

  return payout;
};

/**
 * Get available balance for owner
 */
const getAvailableBalance = async (ownerId) => {
  const completedBookings = await Booking.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(ownerId),
        status: 'completed',
        payoutProcessed: { $ne: true }
      }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalAmount' },
        bookingCount: { $sum: 1 }
      }
    }
  ]);

  const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
  const totalRevenue = completedBookings[0]?.totalRevenue || 0;
  const platformFee = (totalRevenue * platformFeePercentage) / 100;
  const availableBalance = totalRevenue - platformFee;

  return {
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    platformFee: parseFloat(platformFee.toFixed(2)),
    availableBalance: parseFloat(availableBalance.toFixed(2)),
    bookingCount: completedBookings[0]?.bookingCount || 0
  };
};

module.exports = {
  calculateOwnerPayout,
  createPayoutRequest,
  processPayout,
  getOwnerPayouts,
  getPendingPayouts,
  getOwnerPayoutStats,
  cancelPayoutRequest,
  getAvailableBalance
};
