const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllBookings,
  getAllCourts,
  approveCourt,
  rejectCourt,
  getAllPromotions,
  getAuditLogs,
  getSystemSettings,
  updateSystemSettings,
  getRevenueReport,
  exportData
} = require('../controllers/adminController');

/**
 * Admin Routes
 * All routes require admin role
 */

// Protect all routes and authorize admin only
router.use(protect);
router.use(authorize('admin'));

// Dashboard
router.get('/dashboard', getDashboardStats);

// User Management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Booking Management
router.get('/bookings', getAllBookings);

// Court Management
router.get('/courts', getAllCourts);
router.patch('/courts/:id/approve', approveCourt);
router.patch('/courts/:id/reject', rejectCourt);

// Promotion Management
router.get('/promotions', getAllPromotions);

// Audit Logs
router.get('/audit-logs', getAuditLogs);

// System Settings
router.get('/settings', getSystemSettings);
router.put('/settings', updateSystemSettings);

// Reports
router.get('/reports/revenue', getRevenueReport);
router.post('/export/:type', exportData);

module.exports = router;
