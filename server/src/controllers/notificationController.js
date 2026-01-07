const { asyncHandler } = require('../middleware/errorMiddleware');
const Notification = require('../models/Notification');

/**
 * @desc    Get user's notifications
 * @route   GET /api/v1/notifications
 * @access  Private
 */
const getNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;

  const query = { recipient: req.user._id };
  if (status) query.status = status;

  const notifications = await Notification.find(query)
    .populate('sender', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await Notification.countDocuments(query);

  res.json({
    success: true,
    data: notifications,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
});

/**
 * @desc    Get unread notification count
 * @route   GET /api/v1/notifications/unread-count
 * @access  Private
 */
const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.getUnreadCount(req.user._id);

  res.json({
    success: true,
    data: { unreadCount: count }
  });
});

/**
 * @desc    Mark notification as read
 * @route   PATCH /api/v1/notifications/:id/read
 * @access  Private
 */
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  if (notification.recipient.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  await notification.markAsRead();

  res.json({
    success: true,
    message: 'Notification marked as read',
    data: notification
  });
});

/**
 * @desc    Mark all notifications as read
 * @route   PATCH /api/v1/notifications/mark-all-read
 * @access  Private
 */
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.markAllAsRead(req.user._id);

  res.json({
    success: true,
    message: 'All notifications marked as read'
  });
});

/**
 * @desc    Delete notification
 * @route   DELETE /api/v1/notifications/:id
 * @access  Private
 */
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  if (notification.recipient.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  await notification.deleteOne();

  res.json({
    success: true,
    message: 'Notification deleted'
  });
});

module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
};
