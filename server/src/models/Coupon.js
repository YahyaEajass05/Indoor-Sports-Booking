const mongoose = require('mongoose');

/**
 * Coupon Model
 * Handles individual coupon codes and user-specific discounts
 */

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['percentage', 'fixed_amount', 'free_hours']
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  maxDiscount: {
    type: Number,
    default: null
  },
  minPurchase: {
    type: Number,
    default: 0
  },
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  usageCount: {
    type: Number,
    default: 0
  },
  maxUsage: {
    type: Number,
    default: 1
  },
  usedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    usedAt: Date,
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    discountAmount: Number
  }],
  validFrom: {
    type: Date,
    required: true,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'used', 'expired'],
    default: 'active',
    index: true
  },
  description: String
}, { timestamps: true });

couponSchema.index({ code: 1, status: 1 });
couponSchema.index({ issuedTo: 1, status: 1 });

couponSchema.methods.calculateDiscount = function(totalAmount) {
  let discount = 0;
  if (this.type === 'percentage') {
    discount = (totalAmount * this.value) / 100;
  } else if (this.type === 'fixed_amount') {
    discount = this.value;
  }
  if (this.maxDiscount && discount > this.maxDiscount) {
    discount = this.maxDiscount;
  }
  return Math.min(discount, totalAmount);
};

couponSchema.methods.applyCoupon = async function(userId, bookingId, totalAmount) {
  if (this.status !== 'active') {
    throw new Error('Coupon is not active');
  }
  
  const now = new Date();
  if (now < this.validFrom || now > this.validUntil) {
    throw new Error('Coupon has expired');
  }
  
  if (this.usageCount >= this.maxUsage) {
    throw new Error('Coupon usage limit reached');
  }

  const discountAmount = this.calculateDiscount(totalAmount);
  
  this.usedBy.push({
    user: userId,
    usedAt: new Date(),
    booking: bookingId,
    discountAmount
  });
  
  this.usageCount += 1;
  if (this.usageCount >= this.maxUsage) {
    this.status = 'used';
  }
  
  await this.save();
  return { discountAmount, finalAmount: totalAmount - discountAmount };
};

couponSchema.statics.findByCode = function(code) {
  return this.findOne({ code: code.toUpperCase() });
};

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
