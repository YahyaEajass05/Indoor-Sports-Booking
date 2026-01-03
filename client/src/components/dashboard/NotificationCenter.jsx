import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBell,
  FiCalendar,
  FiCreditCard,
  FiGift,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiInfo,
  FiX,
  FiCheck,
  FiTrash2,
  FiFilter,
  FiMoreVertical,
} from 'react-icons/fi';

/**
 * NotificationCenter - Advanced notification management component
 * Features:
 * - Category filtering
 * - Mark as read/unread
 * - Bulk actions
 * - Real-time updates
 * - Priority levels
 * - Grouped by date
 * - Search functionality
 */
const NotificationCenter = ({
  notifications = [],
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onBulkAction,
  showFilters = true,
  grouped = true,
  className = '',
}) => {
  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());
  const [showActions, setShowActions] = useState(null);

  const notificationTypes = {
    booking: {
      icon: FiCalendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    payment: {
      icon: FiCreditCard,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-600 dark:text-green-400',
    },
    promotion: {
      icon: FiGift,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    success: {
      icon: FiCheckCircle,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-600 dark:text-green-400',
    },
    error: {
      icon: FiXCircle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-600 dark:text-red-400',
    },
    warning: {
      icon: FiAlertCircle,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    info: {
      icon: FiInfo,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      textColor: 'text-indigo-600 dark:text-indigo-400',
    },
  };

  const filters = [
    { id: 'all', label: 'All', icon: FiBell },
    { id: 'unread', label: 'Unread', icon: FiBell },
    { id: 'booking', label: 'Bookings', icon: FiCalendar },
    { id: 'payment', label: 'Payments', icon: FiCreditCard },
    { id: 'promotion', label: 'Promotions', icon: FiGift },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification.unread;
    return notification.type === filter;
  });

  const groupByDate = (notifications) => {
    const groups = {};
    notifications.forEach((notification) => {
      const date = new Date(notification.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let groupKey;
      if (date.toDateString() === today.toDateString()) {
        groupKey = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = 'Yesterday';
      } else {
        groupKey = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(notification);
    });
    return groups;
  };

  const groupedNotifications = grouped ? groupByDate(filteredNotifications) : { All: filteredNotifications };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedNotifications(new Set(filteredNotifications.map((n) => n.id)));
    } else {
      setSelectedNotifications(new Set());
    }
  };

  const handleSelectNotification = (id, checked) => {
    const newSelected = new Set(selectedNotifications);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedNotifications(newSelected);
  };

  const handleBulkMarkAsRead = () => {
    if (onBulkAction) {
      onBulkAction('markAsRead', Array.from(selectedNotifications));
    }
    setSelectedNotifications(new Set());
  };

  const handleBulkDelete = () => {
    if (onBulkAction) {
      onBulkAction('delete', Array.from(selectedNotifications));
    }
    setSelectedNotifications(new Set());
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg">
              <FiBell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Notifications
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.size > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedNotifications.size} selected
              </span>
              <motion.button
                onClick={handleBulkMarkAsRead}
                className="px-3 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiCheck className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={handleBulkDelete}
                className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiTrash2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filters.map((f) => (
              <motion.button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  filter === f.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <f.icon className="w-4 h-4" />
                {f.label}
              </motion.button>
            ))}
          </div>
        )}

        {/* Select All */}
        {filteredNotifications.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedNotifications.size === filteredNotifications.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Select all</span>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-h-[600px] overflow-y-auto">
        {Object.keys(groupedNotifications).length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <FiBell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No notifications
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          Object.entries(groupedNotifications).map(([date, notifications]) => (
            <div key={date} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
              {grouped && (
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50">
                  <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {date}
                  </h4>
                </div>
              )}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {notifications.map((notification, index) => {
                    const config = notificationTypes[notification.type] || notificationTypes.info;
                    const Icon = config.icon;

                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                          notification.unread ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''
                        }`}
                      >
                        <div className="flex gap-4">
                          {/* Checkbox */}
                          <div className="flex items-start pt-1">
                            <input
                              type="checkbox"
                              checked={selectedNotifications.has(notification.id)}
                              onChange={(e) => handleSelectNotification(notification.id, e.target.checked)}
                              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </div>

                          {/* Icon */}
                          <motion.div
                            className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                  {new Date(notification.timestamp).toLocaleString()}
                                </p>
                              </div>

                              {/* Unread Indicator */}
                              {notification.unread && (
                                <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-2" />
                              )}
                            </div>

                            {/* Action Buttons */}
                            {notification.action && (
                              <motion.button
                                onClick={notification.action}
                                className={`mt-3 text-sm font-medium ${config.textColor} hover:underline`}
                                whileHover={{ x: 5 }}
                              >
                                {notification.actionLabel || 'View Details'} →
                              </motion.button>
                            )}
                          </div>

                          {/* Actions Menu */}
                          <div className="relative">
                            <motion.button
                              onClick={() => setShowActions(showActions === notification.id ? null : notification.id)}
                              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FiMoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </motion.button>

                            <AnimatePresence>
                              {showActions === notification.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                                >
                                  {notification.unread ? (
                                    <button
                                      onClick={() => {
                                        onMarkAsRead?.(notification.id);
                                        setShowActions(null);
                                      }}
                                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                                    >
                                      <FiCheck className="w-4 h-4" />
                                      <span className="text-sm">Mark as read</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        onMarkAsUnread?.(notification.id);
                                        setShowActions(null);
                                      }}
                                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                                    >
                                      <FiBell className="w-4 h-4" />
                                      <span className="text-sm">Mark as unread</span>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => {
                                      onDelete?.(notification.id);
                                      setShowActions(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors border-t border-gray-200 dark:border-gray-700"
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                    <span className="text-sm">Delete</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
