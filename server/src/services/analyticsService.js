const Booking = require('../models/Booking');
const Court = require('../models/Court');
const User = require('../models/User');

/**
 * Analytics Service
 * Business intelligence and reporting
 */

/**
 * Get booking analytics for a date range
 */
const getBookingAnalytics = async (startDate, endDate, filters = {}) => {
  const matchQuery = {
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  };

  if (filters.courtId) matchQuery.court = filters.courtId;
  if (filters.ownerId) matchQuery.owner = filters.ownerId;
  if (filters.sport) matchQuery.sport = filters.sport;
  if (filters.status) matchQuery.status = filters.status;

  const [totalBookings, revenue, statusBreakdown, sportBreakdown] = await Promise.all([
    // Total bookings
    Booking.countDocuments(matchQuery),

    // Total revenue
    Booking.aggregate([
      { $match: { ...matchQuery, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          averageBookingValue: { $avg: '$totalAmount' }
        }
      }
    ]),

    // Status breakdown
    Booking.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      }
    ]),

    // Sport breakdown
    Booking.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$sport',
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { count: -1 } }
    ])
  ]);

  return {
    period: { startDate, endDate },
    totalBookings,
    revenue: revenue[0] || { totalRevenue: 0, averageBookingValue: 0 },
    statusBreakdown,
    sportBreakdown
  };
};

/**
 * Get revenue trends over time
 */
const getRevenueTrends = async (startDate, endDate, groupBy = 'day') => {
  let dateFormat;
  switch (groupBy) {
    case 'hour':
      dateFormat = '%Y-%m-%d %H:00';
      break;
    case 'day':
      dateFormat = '%Y-%m-%d';
      break;
    case 'week':
      dateFormat = '%Y-W%V';
      break;
    case 'month':
      dateFormat = '%Y-%m';
      break;
    default:
      dateFormat = '%Y-%m-%d';
  }

  const trends = await Booking.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: dateFormat, date: '$date' } },
        revenue: { $sum: '$totalAmount' },
        bookingCount: { $sum: 1 },
        averageValue: { $avg: '$totalAmount' }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return trends;
};

/**
 * Get court performance metrics
 */
const getCourtPerformance = async (courtId, startDate, endDate) => {
  const [bookingStats, revenueStats, utilizationData] = await Promise.all([
    // Booking statistics
    Booking.aggregate([
      {
        $match: {
          court: courtId,
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]),

    // Revenue statistics
    Booking.aggregate([
      {
        $match: {
          court: courtId,
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          averageRevenue: { $avg: '$totalAmount' },
          totalHours: { $sum: '$duration' }
        }
      }
    ]),

    // Utilization by day
    Booking.aggregate([
      {
        $match: {
          court: courtId,
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          },
          status: { $in: ['confirmed', 'completed'] }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          totalHours: { $sum: '$duration' }
        }
      },
      { $sort: { _id: 1 } }
    ])
  ]);

  return {
    courtId,
    period: { startDate, endDate },
    bookingStats,
    revenueStats: revenueStats[0] || { totalRevenue: 0, averageRevenue: 0, totalHours: 0 },
    utilizationData
  };
};

/**
 * Get user behavior analytics
 */
const getUserBehaviorAnalytics = async (userId) => {
  const [bookingHistory, spendingPattern, favoriteSpots] = await Promise.all([
    // Booking history summary
    Booking.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' }
        }
      }
    ]),

    // Spending pattern over time
    Booking.aggregate([
      { $match: { user: userId, status: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          spent: { $sum: '$totalAmount' },
          bookings: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),

    // Favorite courts/sports
    Booking.aggregate([
      { $match: { user: userId, status: { $in: ['confirmed', 'completed'] } } },
      {
        $group: {
          _id: { court: '$court', sport: '$sport' },
          count: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])
  ]);

  return {
    userId,
    bookingHistory,
    spendingPattern,
    favoriteSpots
  };
};

/**
 * Get peak hours analysis
 */
const getPeakHoursAnalysis = async (courtId, startDate, endDate) => {
  const hourlyBookings = await Booking.aggregate([
    {
      $match: {
        ...(courtId && { court: courtId }),
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        },
        status: { $in: ['confirmed', 'completed'] }
      }
    },
    {
      $project: {
        hour: { $substr: ['$startTime', 0, 2] },
        dayOfWeek: { $dayOfWeek: '$date' },
        revenue: '$totalAmount'
      }
    },
    {
      $group: {
        _id: { hour: '$hour', dayOfWeek: '$dayOfWeek' },
        bookingCount: { $sum: 1 },
        totalRevenue: { $sum: '$revenue' }
      }
    },
    { $sort: { bookingCount: -1 } }
  ]);

  return hourlyBookings;
};

/**
 * Get cancellation analysis
 */
const getCancellationAnalysis = async (startDate, endDate) => {
  const cancellationData = await Booking.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        },
        status: 'cancelled'
      }
    },
    {
      $group: {
        _id: '$cancellation.reason',
        count: { $sum: 1 },
        refundAmount: { $sum: '$payment.refundAmount' }
      }
    },
    { $sort: { count: -1 } }
  ]);

  const cancellationRate = await Booking.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        cancelled: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
        }
      }
    },
    {
      $project: {
        total: 1,
        cancelled: 1,
        cancellationRate: {
          $multiply: [{ $divide: ['$cancelled', '$total'] }, 100]
        }
      }
    }
  ]);

  return {
    cancellationData,
    cancellationRate: cancellationRate[0] || { total: 0, cancelled: 0, cancellationRate: 0 }
  };
};

module.exports = {
  getBookingAnalytics,
  getRevenueTrends,
  getCourtPerformance,
  getUserBehaviorAnalytics,
  getPeakHoursAnalysis,
  getCancellationAnalysis
};
