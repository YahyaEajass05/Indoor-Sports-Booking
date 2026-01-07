const mongoose = require('mongoose');

/**
 * Payout Model
 * Handles payment distributions to court owners
 */

const payoutSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  period: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  bookings: [{
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    amount: Number,
    commission: Number,
    netAmount: Number
  }],
  totalBookings: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
  platformFee: {
    type: Number,
    default: 0
  },
  netAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
    default: 'pending',
    index: true
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'paypal', 'stripe', 'check', 'other'],
    required: true
  },
  paymentDetails: {
    accountNumber: String,
    accountName: String,
    bankName: String,
    swiftCode: String,
    paypalEmail: String,
    stripeAccountId: String
  },
  transactionId: String,
  processedAt: Date,
  failureReason: String,
  notes: String,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

payoutSchema.index({ owner: 1, status: 1, createdAt: -1 });
payoutSchema.index({ status: 1, processedAt: 1 });

payoutSchema.methods.markAsCompleted = async function(transactionId) {
  this.status = 'completed';
  this.processedAt = new Date();
  this.transactionId = transactionId;
  await this.save();
  return this;
};

payoutSchema.methods.markAsFailed = async function(reason) {
  this.status = 'failed';
  this.failureReason = reason;
  await this.save();
  return this;
};

payoutSchema.statics.calculateOwnerPayout = async function(ownerId, startDate, endDate) {
  const Booking = mongoose.model('Booking');
  
  const bookings = await Booking.find({
    owner: ownerId,
    status: 'completed',
    date: { $gte: startDate, $lte: endDate },
    payoutProcessed: false
  });

  let totalRevenue = 0;
  const bookingDetails = [];

  bookings.forEach(booking => {
    const commission = booking.totalAmount * 0.1; // 10% platform fee
    const netAmount = booking.totalAmount - commission;
    
    totalRevenue += booking.totalAmount;
    bookingDetails.push({
      booking: booking._id,
      amount: booking.totalAmount,
      commission,
      netAmount
    });
  });

  const platformFee = totalRevenue * 0.1;
  const netAmount = totalRevenue - platformFee;

  return {
    totalBookings: bookings.length,
    totalRevenue,
    platformFee,
    netAmount,
    bookings: bookingDetails
  };
};

const Payout = mongoose.model('Payout', payoutSchema);
module.exports = Payout;
