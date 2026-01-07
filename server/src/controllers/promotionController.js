const { asyncHandler } = require('../middleware/errorMiddleware');
const Promotion = require('../models/Promotion');
const Coupon = require('../models/Coupon');

/**
 * @desc    Get active promotions
 * @route   GET /api/v1/promotions/active
 * @access  Public
 */
const getActivePromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.findActivePromotions();

  res.json({
    success: true,
    data: promotions
  });
});

/**
 * @desc    Get promotion by ID
 * @route   GET /api/v1/promotions/:id
 * @access  Public
 */
const getPromotionById = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);

  if (!promotion) {
    res.status(404);
    throw new Error('Promotion not found');
  }

  res.json({
    success: true,
    data: promotion
  });
});

/**
 * @desc    Create promotion
 * @route   POST /api/v1/promotions
 * @access  Private/Admin/Owner
 */
const createPromotion = asyncHandler(async (req, res) => {
  const promotionData = {
    ...req.body,
    createdBy: req.user._id
  };

  const promotion = await Promotion.create(promotionData);

  res.status(201).json({
    success: true,
    message: 'Promotion created successfully',
    data: promotion
  });
});

/**
 * @desc    Update promotion
 * @route   PUT /api/v1/promotions/:id
 * @access  Private/Admin/Owner
 */
const updatePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);

  if (!promotion) {
    res.status(404);
    throw new Error('Promotion not found');
  }

  const updatedPromotion = await Promotion.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Promotion updated successfully',
    data: updatedPromotion
  });
});

/**
 * @desc    Delete promotion
 * @route   DELETE /api/v1/promotions/:id
 * @access  Private/Admin/Owner
 */
const deletePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id);

  if (!promotion) {
    res.status(404);
    throw new Error('Promotion not found');
  }

  await promotion.deleteOne();

  res.json({
    success: true,
    message: 'Promotion deleted successfully'
  });
});

/**
 * @desc    Validate coupon code
 * @route   POST /api/v1/promotions/validate-coupon
 * @access  Private
 */
const validateCoupon = asyncHandler(async (req, res) => {
  const { code, totalAmount } = req.body;

  const coupon = await Coupon.findByCode(code);

  if (!coupon) {
    res.status(404);
    throw new Error('Invalid coupon code');
  }

  if (coupon.status !== 'active') {
    res.status(400);
    throw new Error('Coupon is not active');
  }

  const now = new Date();
  if (now < coupon.validFrom || now > coupon.validUntil) {
    res.status(400);
    throw new Error('Coupon has expired');
  }

  if (coupon.minPurchase > totalAmount) {
    res.status(400);
    throw new Error(`Minimum purchase amount is ${coupon.minPurchase}`);
  }

  const discountAmount = coupon.calculateDiscount(totalAmount);

  res.json({
    success: true,
    data: {
      valid: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        description: coupon.description
      },
      discountAmount,
      finalAmount: totalAmount - discountAmount
    }
  });
});

/**
 * @desc    Apply coupon to booking
 * @route   POST /api/v1/promotions/apply-coupon
 * @access  Private
 */
const applyCoupon = asyncHandler(async (req, res) => {
  const { code, bookingId, totalAmount } = req.body;

  const coupon = await Coupon.findByCode(code);

  if (!coupon) {
    res.status(404);
    throw new Error('Invalid coupon code');
  }

  const result = await coupon.applyCoupon(req.user._id, bookingId, totalAmount);

  res.json({
    success: true,
    message: 'Coupon applied successfully',
    data: result
  });
});

/**
 * @desc    Get user's coupons
 * @route   GET /api/v1/promotions/my-coupons
 * @access  Private
 */
const getUserCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.findValidCouponsForUser(req.user._id);

  res.json({
    success: true,
    data: coupons
  });
});

module.exports = {
  getActivePromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
  validateCoupon,
  applyCoupon,
  getUserCoupons
};
