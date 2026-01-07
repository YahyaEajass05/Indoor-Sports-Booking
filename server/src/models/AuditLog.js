const mongoose = require('mongoose');

/**
 * AuditLog Model
 * Tracks all important system actions for security and compliance
 */

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'user_login',
      'user_logout',
      'user_register',
      'user_update',
      'user_delete',
      'password_change',
      'password_reset',
      'booking_create',
      'booking_update',
      'booking_cancel',
      'payment_process',
      'payment_refund',
      'court_create',
      'court_update',
      'court_delete',
      'promotion_create',
      'promotion_update',
      'admin_action',
      'settings_change',
      'data_export',
      'permission_change'
    ],
    index: true
  },
  entityType: {
    type: String,
    enum: ['user', 'booking', 'court', 'payment', 'promotion', 'system']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId
  },
  changes: {
    before: mongoose.Schema.Types.Mixed,
    after: mongoose.Schema.Types.Mixed
  },
  ipAddress: String,
  userAgent: String,
  status: {
    type: String,
    enum: ['success', 'failure', 'pending'],
    default: 'success'
  },
  errorMessage: String,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

auditLogSchema.index({ user: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ createdAt: -1 });

auditLogSchema.statics.log = async function(data) {
  try {
    const log = new this(data);
    await log.save();
    return log;
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};

auditLogSchema.statics.getUserActivity = function(userId, limit = 50) {
  return this.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

auditLogSchema.statics.getRecentActivity = function(limit = 100) {
  return this.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('user', 'name email');
};

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
module.exports = AuditLog;
