const mongoose = require('mongoose');

/**
 * Notification Model
 * Handles in-app notifications, email notifications, and SMS alerts
 */

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  type: {
    type: String,
    required: true,
    enum: [
      'booking_confirmed',
      'booking_cancelled',
      'booking_reminder',
      'payment_received',
      'payment_failed',
      'refund_processed',
      'promotion_available',
      'account_verified',
      'password_changed',
      'system_announcement'
    ]
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'failed', 'read'],
    default: 'pending'
  },
  readAt: {
    type: Date,
    default: null
  },
  relatedEntity: {
    entityType: {
      type: String,
      enum: ['booking', 'court', 'payment', 'promotion']
    },
    entityId: mongoose.Schema.Types.ObjectId
  },
  actionUrl: String,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

notificationSchema.index({ recipient: 1, status: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, readAt: 1 });

notificationSchema.methods.markAsRead = async function() {
  if (!this.readAt) {
    this.readAt = new Date();
    this.status = 'read';
    await this.save();
  }
  return this;
};

notificationSchema.statics.getUnreadCount = function(userId) {
  return this.countDocuments({ recipient: userId, readAt: null });
};

notificationSchema.statics.markAllAsRead = function(userId) {
  return this.updateMany(
    { recipient: userId, readAt: null },
    { readAt: new Date(), status: 'read' }
  );
};

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
