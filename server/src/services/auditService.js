const AuditLog = require('../models/AuditLog');

/**
 * Audit Service
 * System activity logging and compliance
 */

/**
 * Create audit log entry
 */
const createAuditLog = async (data) => {
  try {
    const log = await AuditLog.create({
      user: data.userId,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      changes: data.changes,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      status: data.status || 'success',
      errorMessage: data.errorMessage,
      metadata: data.metadata
    });

    return log;
  } catch (error) {
    console.error('Failed to create audit log:', error);
    return null;
  }
};

/**
 * Log user authentication
 */
const logAuthentication = async (userId, action, req, success = true) => {
  return createAuditLog({
    userId,
    action,
    entityType: 'user',
    entityId: userId,
    ipAddress: req.ip || req.connection.remoteAddress,
    userAgent: req.get('user-agent'),
    status: success ? 'success' : 'failure',
    metadata: {
      timestamp: new Date(),
      method: req.method,
      path: req.path
    }
  });
};

/**
 * Log data modification
 */
const logDataChange = async (userId, action, entityType, entityId, beforeData, afterData, req) => {
  return createAuditLog({
    userId,
    action,
    entityType,
    entityId,
    changes: {
      before: beforeData,
      after: afterData
    },
    ipAddress: req?.ip || req?.connection?.remoteAddress,
    userAgent: req?.get('user-agent'),
    status: 'success'
  });
};

/**
 * Log payment transaction
 */
const logPayment = async (userId, action, bookingId, amount, status, req) => {
  return createAuditLog({
    userId,
    action,
    entityType: 'payment',
    entityId: bookingId,
    status,
    ipAddress: req?.ip,
    userAgent: req?.get('user-agent'),
    metadata: {
      amount,
      currency: 'USD',
      timestamp: new Date()
    }
  });
};

/**
 * Log admin action
 */
const logAdminAction = async (adminId, action, targetEntityType, targetEntityId, req, metadata = {}) => {
  return createAuditLog({
    userId: adminId,
    action,
    entityType: targetEntityType,
    entityId: targetEntityId,
    status: 'success',
    ipAddress: req?.ip,
    userAgent: req?.get('user-agent'),
    metadata: {
      ...metadata,
      isAdminAction: true,
      timestamp: new Date()
    }
  });
};

/**
 * Log security event
 */
const logSecurityEvent = async (userId, action, req, details = {}) => {
  return createAuditLog({
    userId,
    action,
    entityType: 'system',
    status: details.success ? 'success' : 'failure',
    errorMessage: details.errorMessage,
    ipAddress: req?.ip,
    userAgent: req?.get('user-agent'),
    metadata: {
      ...details,
      timestamp: new Date()
    }
  });
};

/**
 * Get user activity logs
 */
const getUserActivityLogs = async (userId, limit = 50, filters = {}) => {
  const query = { user: userId };
  
  if (filters.action) query.action = filters.action;
  if (filters.entityType) query.entityType = filters.entityType;
  if (filters.startDate) {
    query.createdAt = { $gte: new Date(filters.startDate) };
  }
  if (filters.endDate) {
    query.createdAt = { ...query.createdAt, $lte: new Date(filters.endDate) };
  }

  return AuditLog.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

/**
 * Get system activity logs
 */
const getSystemActivityLogs = async (limit = 100, filters = {}) => {
  const query = {};
  
  if (filters.action) query.action = filters.action;
  if (filters.userId) query.user = filters.userId;
  if (filters.entityType) query.entityType = filters.entityType;
  if (filters.status) query.status = filters.status;
  if (filters.startDate) {
    query.createdAt = { $gte: new Date(filters.startDate) };
  }
  if (filters.endDate) {
    query.createdAt = { ...query.createdAt, $lte: new Date(filters.endDate) };
  }

  return AuditLog.find(query)
    .populate('user', 'name email role')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

/**
 * Get audit trail for specific entity
 */
const getEntityAuditTrail = async (entityType, entityId) => {
  return AuditLog.find({
    entityType,
    entityId
  })
    .populate('user', 'name email role')
    .sort({ createdAt: -1 })
    .lean();
};

/**
 * Get failed login attempts
 */
const getFailedLoginAttempts = async (timeWindow = 15) => {
  const cutoffTime = new Date(Date.now() - timeWindow * 60 * 1000);

  return AuditLog.aggregate([
    {
      $match: {
        action: 'user_login',
        status: 'failure',
        createdAt: { $gte: cutoffTime }
      }
    },
    {
      $group: {
        _id: '$ipAddress',
        attempts: { $sum: 1 },
        users: { $addToSet: '$user' }
      }
    },
    { $sort: { attempts: -1 } }
  ]);
};

/**
 * Clean up old audit logs
 */
const cleanupOldLogs = async (daysToKeep = 90) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

  const result = await AuditLog.deleteMany({
    createdAt: { $lt: cutoffDate },
    action: { $nin: ['user_delete', 'payment_process', 'admin_action'] } // Keep critical logs
  });

  console.log(`Cleaned up ${result.deletedCount} old audit logs`);
  return result;
};

module.exports = {
  createAuditLog,
  logAuthentication,
  logDataChange,
  logPayment,
  logAdminAction,
  logSecurityEvent,
  getUserActivityLogs,
  getSystemActivityLogs,
  getEntityAuditTrail,
  getFailedLoginAttempts,
  cleanupOldLogs
};
