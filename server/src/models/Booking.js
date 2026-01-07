const mongoose = require('mongoose');

/**
 * Booking Model Schema
 * Features:
 * - Complete booking lifecycle
 * - Conflict detection
 * - Dynamic pricing calculation
 * - Payment tracking
 * - Cancellation policies
 * - Refund management
 * - Status tracking
 */

const bookingSchema = new mongoose.Schema({
  // References
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: true,
    index: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  sport: {
    type: String,
    enum: ['basketball', 'tennis', 'badminton', 'volleyball', 'squash', 'futsal', 'table-tennis', 'other']
  },
  
  // Booking Details
  bookingId: {
    type: String,
    unique: true,
    default: function() {
      return 'BKG-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required'],
    index: true
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM']
  },
  duration: {
    type: Number,
    required: true,
    min: [0.5, 'Duration must be at least 0.5 hours']
  },
  
  // Pricing Breakdown
  pricing: {
    hourlyRate: {
      type: Number,
      required: true
    },
    isPeakHour: {
      type: Boolean,
      default: false
    },
    subtotal: {
      type: Number,
      required: true
    },
    discount: {
      amount: {
        type: Number,
        default: 0
      },
      code: String,
      percentage: Number
    },
    platformFee: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  
  // Direct totalAmount field for easier queries
  totalAmount: {
    type: Number,
    required: true
  },
  
  // Payment Information
  payment: {
    method: {
      type: String,
      enum: ['card', 'paypal', 'wallet', 'cash'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date,
    refundAmount: {
      type: Number,
      default: 0
    },
    refundedAt: Date,
    refundReason: String
  },
  
  // Booking Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'pending',
    index: true
  },
  
  // Cancellation
  cancellation: {
    cancelledAt: Date,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    refundEligible: {
      type: Boolean,
      default: false
    },
    refundPercentage: {
      type: Number,
      default: 0
    }
  },
  
  // Additional Information
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  specialRequests: String,
  numberOfPlayers: Number,
  
  // Check-in/Check-out
  checkIn: {
    time: Date,
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  checkOut: {
    time: Date,
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  
  // Notifications
  notifications: {
    reminderSent: {
      type: Boolean,
      default: false
    },
    confirmationSent: {
      type: Boolean,
      default: false
    },
    cancellationSent: {
      type: Boolean,
      default: false
    }
  },
  
  // Payout tracking
  payoutProcessed: {
    type: Boolean,
    default: false
  },
  payoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payout'
  },
  
  // Soft Delete
  deletedAt: Date
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound indexes for conflict detection
bookingSchema.index({ court: 1, date: 1, startTime: 1, endTime: 1 });
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ status: 1, date: 1 });
bookingSchema.index({ owner: 1, status: 1 });

// Pre-save hook to populate owner and sport from court
bookingSchema.pre('save', async function(next) {
  if (this.isNew && this.court) {
    const Court = mongoose.model('Court');
    const court = await Court.findById(this.court);
    if (court) {
      this.owner = court.owner;
      this.sport = court.sport;
    }
  }
  
  // Sync totalAmount from pricing
  if (this.pricing && this.pricing.totalAmount) {
    this.totalAmount = this.pricing.totalAmount;
  }
  
  next();
});

// Virtual for formatted date
bookingSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
});

// Check if booking is in the past
bookingSchema.virtual('isPast').get(function() {
  const bookingDateTime = new Date(this.date);
  const [hours, minutes] = this.endTime.split(':');
  bookingDateTime.setHours(hours, minutes);
  return bookingDateTime < new Date();
});

// Check if booking can be cancelled
bookingSchema.virtual('canBeCancelled').get(function() {
  if (this.status !== 'confirmed' && this.status !== 'pending') return false;
  
  const bookingDateTime = new Date(this.date);
  const [hours, minutes] = this.startTime.split(':');
  bookingDateTime.setHours(hours, minutes);
  
  const hoursUntilBooking = (bookingDateTime - new Date()) / (1000 * 60 * 60);
  const cancellationDeadline = parseInt(process.env.CANCELLATION_DEADLINE_HOURS) || 24;
  
  return hoursUntilBooking >= cancellationDeadline;
});

// Calculate refund eligibility
bookingSchema.methods.calculateRefund = function() {
  if (!this.canBeCancelled) {
    return { eligible: false, amount: 0, percentage: 0 };
  }
  
  const bookingDateTime = new Date(this.date);
  const [hours, minutes] = this.startTime.split(':');
  bookingDateTime.setHours(hours, minutes);
  
  const hoursUntilBooking = (bookingDateTime - new Date()) / (1000 * 60 * 60);
  
  let refundPercentage = 0;
  if (hoursUntilBooking >= 48) {
    refundPercentage = 100; // Full refund
  } else if (hoursUntilBooking >= 24) {
    refundPercentage = parseInt(process.env.REFUND_PERCENTAGE) || 80; // 80% refund
  } else {
    refundPercentage = 50; // 50% refund
  }
  
  const refundAmount = (this.pricing.totalAmount * refundPercentage) / 100;
  
  return {
    eligible: true,
    amount: refundAmount,
    percentage: refundPercentage
  };
};

// Query helpers
bookingSchema.query.upcoming = function() {
  return this.where({ 
    date: { $gte: new Date() },
    status: { $in: ['confirmed', 'pending'] }
  });
};

bookingSchema.query.byUser = function(userId) {
  return this.where({ user: userId });
};

bookingSchema.query.byCourt = function(courtId) {
  return this.where({ court: courtId });
};

module.exports = mongoose.model('Booking', bookingSchema);
