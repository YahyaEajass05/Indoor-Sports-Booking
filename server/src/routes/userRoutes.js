const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  refreshToken,
  updatePassword,
} = require('../controllers/authController');
const {
  getProfile,
  updateProfile,
  deleteAccount,
  getUserStats,
} = require('../controllers/userController');

/**
 * Authentication Routes
 */
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', protect, logout);
router.get('/auth/me', protect, getMe);
router.post('/auth/verify-email/:token', verifyEmail);
router.post('/auth/resend-verification', protect, resendVerification);
router.post('/auth/forgot-password', forgotPassword);
router.put('/auth/reset-password/:token', resetPassword);
router.post('/auth/refresh-token', refreshToken);
router.put('/auth/update-password', protect, updatePassword);

/**
 * User Profile Routes
 */
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/account', protect, deleteAccount);
router.get('/stats', protect, getUserStats);

module.exports = router;
