const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createBooking,
  getBooking,
  getUserBookings,
  updateBooking,
  cancelBooking,
  getAvailableSlots,
  checkSlotAvailability,
  getBookingStats
} = require('../controllers/bookingController');

/**
 * Booking Routes
 * All routes require authentication
 */

// Public routes (with authentication)
router.use(protect);

// Get available slots for a court
router.get('/courts/:courtId/available-slots', getAvailableSlots);

// Check specific slot availability
router.post('/courts/:courtId/check-availability', checkSlotAvailability);

// Create a new booking
router.post('/', createBooking);

// Get user's bookings
router.get('/my-bookings', getUserBookings);

// Get booking statistics
router.get('/stats', getBookingStats);

// Get specific booking
router.get('/:id', getBooking);

// Update booking
router.put('/:id', updateBooking);

// Cancel booking
router.patch('/:id/cancel', cancelBooking);

module.exports = router;
