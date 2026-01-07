const Court = require('../models/Court');
const Promotion = require('../models/Promotion');
const Coupon = require('../models/Coupon');

/**
 * Pricing Service
 * Dynamic pricing calculations and discount management
 */

/**
 * Calculate base booking price
 */
const calculateBasePrice = async (courtId, date, startTime, endTime, duration) => {
  const court = await Court.findById(courtId);
  
  if (!court) {
    throw new Error('Court not found');
  }

  const bookingDate = new Date(date);
  const dayOfWeek = bookingDate.toLocaleDateString('en-US', { weekday: 'lowercase' });
  
  // Get base hourly rate
  let hourlyRate = court.pricing.hourlyRate || court.pricing.basePrice || 0;
  
  // Check if it's a peak hour
  let isPeakHour = false;
  if (court.pricing.peakHours && court.pricing.peakHours.enabled) {
    const [startHour] = startTime.split(':').map(Number);
    
    // Check peak hours configuration
    if (court.pricing.peakHourRate) {
      hourlyRate = court.pricing.peakHourRate;
      isPeakHour = true;
    } else if (court.pricing.peakHours.multiplier) {
      hourlyRate = hourlyRate * court.pricing.peakHours.multiplier;
      isPeakHour = true;
    }
  }
  
  // Calculate subtotal
  const subtotal = hourlyRate * duration;
  
  return {
    hourlyRate,
    duration,
    subtotal: parseFloat(subtotal.toFixed(2)),
    isPeakHour,
    currency: court.pricing.currency || 'USD'
  };
};

/**
 * Apply promotions and discounts
 */
const applyPromotions = async (basePrice, courtId, userId, promotionCodes = []) => {
  let totalDiscount = 0;
  const appliedPromotions = [];
  
  // Check for automatic promotions
  const autoPromotions = await Promotion.find({
    status: 'active',
    autoApply: true,
    validFrom: { $lte: new Date() },
    validUntil: { $gte: new Date() }
  });
  
  for (const promo of autoPromotions) {
    const discount = promo.calculateDiscount(basePrice);
    if (discount > 0) {
      totalDiscount += discount;
      appliedPromotions.push({
        id: promo._id,
        code: promo.code,
        title: promo.title,
        discount
      });
    }
  }
  
  // Apply coupon codes
  for (const code of promotionCodes) {
    const coupon = await Coupon.findByCode(code);
    if (coupon && coupon.status === 'active') {
      const canUse = coupon.canBeUsedBy(userId);
      if (canUse.valid) {
        const discount = coupon.calculateDiscount(basePrice);
        totalDiscount += discount;
        appliedPromotions.push({
          id: coupon._id,
          code: coupon.code,
          type: 'coupon',
          discount
        });
      }
    }
  }
  
  return {
    totalDiscount: parseFloat(totalDiscount.toFixed(2)),
    appliedPromotions
  };
};

/**
 * Calculate total booking price with all fees
 */
const calculateTotalPrice = async (courtId, date, startTime, endTime, duration, options = {}) => {
  // Get base price
  const basePrice = await calculateBasePrice(courtId, date, startTime, endTime, duration);
  
  // Apply promotions
  let discount = 0;
  let appliedPromotions = [];
  
  if (options.promotionCodes || options.userId) {
    const promotionResult = await applyPromotions(
      basePrice.subtotal,
      courtId,
      options.userId,
      options.promotionCodes || []
    );
    discount = promotionResult.totalDiscount;
    appliedPromotions = promotionResult.appliedPromotions;
  }
  
  // Calculate subtotal after discount
  const subtotalAfterDiscount = Math.max(0, basePrice.subtotal - discount);
  
  // Calculate platform fee
  const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
  const platformFee = (subtotalAfterDiscount * platformFeePercentage) / 100;
  
  // Calculate tax
  const taxPercentage = options.taxPercentage || 8;
  const tax = ((subtotalAfterDiscount + platformFee) * taxPercentage) / 100;
  
  // Calculate total
  const totalAmount = subtotalAfterDiscount + platformFee + tax;
  
  return {
    basePrice: basePrice.subtotal,
    hourlyRate: basePrice.hourlyRate,
    duration: basePrice.duration,
    isPeakHour: basePrice.isPeakHour,
    discount,
    appliedPromotions,
    subtotalAfterDiscount: parseFloat(subtotalAfterDiscount.toFixed(2)),
    platformFee: parseFloat(platformFee.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    currency: basePrice.currency,
    breakdown: {
      base: basePrice.subtotal,
      discount: discount,
      subtotal: subtotalAfterDiscount,
      platformFee: platformFee,
      tax: tax,
      total: totalAmount
    }
  };
};

/**
 * Calculate refund amount
 */
const calculateRefund = (totalAmount, bookingDate, cancellationDate) => {
  const hoursUntilBooking = (new Date(bookingDate) - new Date(cancellationDate)) / (1000 * 60 * 60);
  const deadlineHours = parseInt(process.env.CANCELLATION_DEADLINE_HOURS) || 24;
  
  if (hoursUntilBooking < deadlineHours) {
    return {
      eligible: false,
      amount: 0,
      percentage: 0,
      reason: `Cancellation must be at least ${deadlineHours} hours before booking`
    };
  }
  
  const refundPercentage = parseInt(process.env.REFUND_PERCENTAGE) || 80;
  const refundAmount = (totalAmount * refundPercentage) / 100;
  
  return {
    eligible: true,
    amount: parseFloat(refundAmount.toFixed(2)),
    percentage: refundPercentage,
    reason: null
  };
};

/**
 * Calculate dynamic pricing based on demand
 */
const calculateDynamicPrice = async (courtId, date, startTime, basePrice) => {
  // This is a placeholder for future dynamic pricing implementation
  // You can implement surge pricing based on:
  // - Booking demand
  // - Special events
  // - Holidays
  // - Weather
  // - Time until booking
  
  return basePrice;
};

/**
 * Get pricing estimate
 */
const getPricingEstimate = async (courtId, date, startTime, endTime, duration) => {
  const estimate = await calculateTotalPrice(courtId, date, startTime, endTime, duration);
  
  return {
    estimate,
    notes: [
      'Prices are subject to availability',
      'Final price may vary based on promotions applied at checkout',
      'Cancellation fees may apply'
    ]
  };
};

module.exports = {
  calculateBasePrice,
  applyPromotions,
  calculateTotalPrice,
  calculateRefund,
  calculateDynamicPrice,
  getPricingEstimate
};
