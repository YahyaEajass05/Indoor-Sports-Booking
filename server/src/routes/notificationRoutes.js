const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require('../controllers/notificationController');

/**
 * Notification Routes
 * All routes require authentication
 */

router.use(protect);

// Get all notifications for user
router.get('/', getNotifications);

// Get unread count
router.get('/unread-count', getUnreadCount);

// Mark notification as read
router.patch('/:id/read', markAsRead);

// Mark all as read
router.patch('/mark-all-read', markAllAsRead);

// Delete notification
router.delete('/:id', deleteNotification);

module.exports = router;
