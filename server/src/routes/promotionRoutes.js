const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getActivePromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
  validateCoupon,
  applyCoupon,
  getUserCoupons
} = require('../controllers/promotionController');

/**
 * Promotion Routes
 */

// Public routes
router.get('/active', getActivePromotions);
router.get('/:id', getPromotionById);

// Protected routes
router.use(protect);

// Coupon validation and application
router.post('/validate-coupon', validateCoupon);
router.post('/apply-coupon', applyCoupon);
router.get('/my-coupons', getUserCoupons);

// Admin/Owner only routes
router.post('/', authorize('admin', 'owner'), createPromotion);
router.put('/:id', authorize('admin', 'owner'), updatePromotion);
router.delete('/:id', authorize('admin', 'owner'), deletePromotion);

module.exports = router;
