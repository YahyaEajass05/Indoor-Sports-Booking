import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBell,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiGift,
  FiCreditCard,
  FiCalendar,
  FiTrash2,
  FiCheck,
  FiFilter,
  FiSettings,
  FiX
} from 'react-icons/fi';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Booking Confirmed',
      message: 'Your booking for Premier Basketball Court on Jan 20, 2024 has been confirmed.',
      time: '2 hours ago',
      read: false,
      icon: FiCheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      type: 'info',
      title: 'Special Offer',
      message: 'Get 20% off on weekend bookings! Use code WEEKEND20 at checkout.',
      time: '5 hours ago',
      read: false,
      icon: FiGift,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Payment Method Expiring',
      message: 'Your Visa card ending in 4532 expires next month. Please update your payment information.',
      time: '1 day ago',
      read: false,
      icon: FiCreditCard,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 4,
      type: 'info',
      title: 'New Court Available',
      message: 'Elite Tennis Arena is now available for booking in your area.',
      time: '2 days ago',
      read: true,
      icon: FiInfo,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 5,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your payment of $120 for booking BK-2024-010 has been processed successfully.',
      time: '3 days ago',
      read: true,
      icon: FiCheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 6,
      type: 'alert',
      title: 'Booking Reminder',
      message: 'Your booking at Pro Badminton Hall starts tomorrow at 6:00 PM.',
      time: '3 days ago',
      read: true,
      icon: FiCalendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 7,
      type: 'warning',
      title: 'Weather Alert',
      message: 'Heavy rain expected tomorrow. Your outdoor booking might be affected.',
      time: '4 days ago',
      read: true,
      icon: FiAlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    }
  ]);

  const filteredNotifications = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter(n => !n.read);
    }
    return notifications;
  }, [notifications, filter]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl border border-gray-200/50 p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold gradient-text">Notifications</h1>
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </div>
              <p className="text-gray-600">Stay updated with your bookings and offers</p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" size="sm" icon={FiSettings}>
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-4 rounded-2xl border border-gray-200/50"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All ({notifications.length})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  filter === 'unread'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Unread ({unreadCount})
              </motion.button>
            </div>

            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="secondary" size="sm" icon={FiCheck} onClick={markAllAsRead}>
                  Mark All Read
                </Button>
              )}
              <Button variant="outline" size="sm" icon={FiTrash2} onClick={clearAll}>
                Clear All
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  variants={itemVariants}
                  exit="exit"
                  layout
                  whileHover={{ scale: 1.01, x: 5 }}
                  className={`glass rounded-2xl border overflow-hidden transition-all cursor-pointer ${
                    notification.read
                      ? 'border-gray-200/50 bg-white/50'
                      : 'border-primary-200/50 bg-gradient-to-r from-primary-50/50 to-purple-50/50'
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="p-6 flex gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 ${notification.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`text-2xl ${notification.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {notification.title}
                          {!notification.read && (
                            <span className="w-2 h-2 bg-primary-500 rounded-full" />
                          )}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="text-xs px-3 py-1 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
                          >
                            Mark as Read
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1"
                        >
                          <FiX className="text-sm" />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Unread Indicator Bar */}
                  {!notification.read && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="h-1 bg-gradient-to-r from-primary-500 to-purple-600"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-16 rounded-2xl border border-gray-200/50 text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full mb-6">
              <FiBell className="text-5xl text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {filter === 'unread' ? 'All Caught Up!' : 'No Notifications'}
            </h3>
            <p className="text-gray-600">
              {filter === 'unread'
                ? 'You have no unread notifications'
                : 'You have no notifications at this time'}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;
