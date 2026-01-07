const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { isOwner } = require('../middleware/ownerMiddleware');
const {
  getDashboardStats,
  getMyCourts,
  createCourt,
  updateCourt,
  deleteCourt,
  getCourtBookings,
  updateBookingStatus,
  getRevenue,
  getPayouts,
  requestPayout,
  updateAvailability,
  getAnalytics
} = require('../controllers/ownerController');

/**
 * Owner Routes
 * All routes require owner role
 */

// Protect all routes and authorize owner only
router.use(protect);
router.use(authorize('owner', 'admin'));

// Dashboard
router.get('/dashboard', getDashboardStats);

// Court Management
router.get('/courts', getMyCourts);
router.post('/courts', createCourt);
router.put('/courts/:id', isOwner, updateCourt);
router.delete('/courts/:id', isOwner, deleteCourt);

// Availability Management
router.put('/courts/:id/availability', isOwner, updateAvailability);

// Booking Management
router.get('/courts/:id/bookings', isOwner, getCourtBookings);
router.patch('/bookings/:id/status', updateBookingStatus);

// Revenue & Payouts
router.get('/revenue', getRevenue);
router.get('/payouts', getPayouts);
router.post('/payouts/request', requestPayout);

// Analytics
router.get('/analytics', getAnalytics);

module.exports = router;
