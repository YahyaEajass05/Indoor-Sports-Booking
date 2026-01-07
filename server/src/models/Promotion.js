const mongoose = require('mongoose');

/**
 * Promotion Model
 * Handles promotional campaigns, discounts, and special offers
 */

const promotionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Promotion title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Promotion description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  code: {
    type: String,
    unique: true,
    uppercase: true,
    trim: true,
    sparse: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['percentage', 'fixed', 'free_hours', 'bundle', 'seasonal']
  },
  discountValue: {
    type: Number,
    required: [true, 'Discount value is required'],
    min: [0, 'Discount value must be positive']
  },
  maxDiscountAmount: {
    type: Number,
    default: null
  },
  minPurchaseAmount: {
    type: Number,
    default: 0
  },
  applicableTo: {
    type: String,
    enum: ['all', 'specific_courts', 'specific_sports'],
    default: 'all'
  },
  targetCourts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court'
  }],
  targetSports: [String],
  usageLimit: {
    totalUsageLimit: Number,
    perUserLimit: { type: Number, default: 1 },
    currentUsageCount: { type: Number, default: 0 }
  },
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'expired', 'scheduled'],
    default: 'scheduled'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  analytics: {
    views: { type: Number, default: 0 },
    uses: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  }
}, { timestamps: true });

promotionSchema.index({ status: 1, validFrom: 1, validUntil: 1 });
promotionSchema.index({ code: 1, status: 1 });

promotionSchema.methods.calculateDiscount = function(totalAmount) {
  let discount = 0;
  if (this.type === 'percentage') {
    discount = (totalAmount * this.discountValue) / 100;
  } else if (this.type === 'fixed') {
    discount = this.discountValue;
  }
  if (this.maxDiscountAmount && discount > this.maxDiscountAmount) {
    discount = this.maxDiscountAmount;
  }
  return Math.min(discount, totalAmount);
};

promotionSchema.statics.findActivePromotions = function() {
  const now = new Date();
  return this.find({
    status: 'active',
    validFrom: { $lte: now },
    validUntil: { $gte: now }
  });
};

const Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion;
