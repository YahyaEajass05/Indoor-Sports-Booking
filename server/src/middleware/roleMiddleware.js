/**
 * Role-based Access Control Middleware
 * Provides granular permission control
 */

const permissions = {
  // Admin permissions
  admin: {
    users: ['create', 'read', 'update', 'delete'],
    courts: ['create', 'read', 'update', 'delete', 'approve'],
    bookings: ['create', 'read', 'update', 'delete', 'cancel'],
    promotions: ['create', 'read', 'update', 'delete'],
    payments: ['read', 'refund'],
    reports: ['read', 'generate'],
    settings: ['read', 'update'],
    audit: ['read']
  },
  
  // Owner permissions
  owner: {
    courts: ['create', 'read', 'update', 'delete'],
    bookings: ['read', 'update', 'cancel'],
    promotions: ['create', 'read', 'update', 'delete'],
    payouts: ['read', 'request'],
    revenue: ['read'],
    reviews: ['read', 'respond']
  },
  
  // User permissions
  user: {
    courts: ['read'],
    bookings: ['create', 'read', 'cancel'],
    profile: ['read', 'update'],
    reviews: ['create', 'read', 'update', 'delete'],
    payments: ['create', 'read']
  }
};

/**
 * Check if user has permission
 */
const hasPermission = (role, resource, action) => {
  const rolePermissions = permissions[role];
  if (!rolePermissions) return false;
  
  const resourcePermissions = rolePermissions[resource];
  if (!resourcePermissions) return false;
  
  return resourcePermissions.includes(action);
};

/**
 * Require specific permission
 */
const requirePermission = (resource, action) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!hasPermission(req.user.role, resource, action)) {
      return res.status(403).json({
        success: false,
        message: `You don't have permission to ${action} ${resource}`
      });
    }

    next();
  };
};

/**
 * Check multiple permissions (OR logic)
 */
const requireAnyPermission = (permissionPairs) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const hasAnyPermission = permissionPairs.some(([resource, action]) => 
      hasPermission(req.user.role, resource, action)
    );

    if (!hasAnyPermission) {
      return res.status(403).json({
        success: false,
        message: 'You don\'t have the required permissions'
      });
    }

    next();
  };
};

module.exports = {
  hasPermission,
  requirePermission,
  requireAnyPermission,
  permissions
};
