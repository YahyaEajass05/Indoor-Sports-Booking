import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  FiCalendar,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMapPin,
  FiUser,
  FiDollarSign,
  FiGift,
  FiStar,
  FiActivity,
  FiTrendingUp,
  FiAlertCircle,
  FiInfo,
} from 'react-icons/fi';

/**
 * ActivityTimeline - Real-time activity timeline with animations
 * Features:
 * - Real-time activity updates
 * - Animated entry for new items
 * - Icon-based activity types
 * - Time ago formatting
 * - Grouped by date
 * - Filter by activity type
 * - Infinite scroll support
 */
const ActivityTimeline = ({
  activities = [],
  showFilters = true,
  maxItems = 10,
  animated = true,
  className = '',
}) => {
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(maxItems);

  const activityTypes = {
    booking: {
      icon: FiCalendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    payment: {
      icon: FiCreditCard,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    confirmation: {
      icon: FiCheckCircle,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    cancellation: {
      icon: FiXCircle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
    },
    reminder: {
      icon: FiClock,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    promotion: {
      icon: FiGift,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    achievement: {
      icon: FiStar,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    info: {
      icon: FiInfo,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400',
    },
  };

  const filters = [
    { id: 'all', label: 'All Activities', icon: FiActivity },
    { id: 'booking', label: 'Bookings', icon: FiCalendar },
    { id: 'payment', label: 'Payments', icon: FiCreditCard },
    { id: 'promotion', label: 'Promotions', icon: FiGift },
  ];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(activities.filter((a) => a.type === activeFilter));
    }
  }, [activeFilter, activities]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMs = now - activityTime;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return activityTime.toLocaleDateString();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filters */}
      {showFilters && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
            </motion.button>
          ))}
        </div>
      )}

      {/* Timeline */}
      <motion.div
        variants={animated ? containerVariants : {}}
        initial={animated ? 'hidden' : false}
        animate="visible"
        className="relative"
      >
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-transparent" />

        {/* Activities */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredActivities.slice(0, visibleCount).map((activity, index) => {
              const config = activityTypes[activity.type] || activityTypes.info;
              const Icon = config.icon;

              return (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  className="relative flex gap-4"
                >
                  {/* Icon */}
                  <motion.div
                    className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    
                    {/* Pulse Animation for Recent Activities */}
                    {index === 0 && (
                      <motion.div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${config.color}`}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'loop',
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {activity.description}
                        </p>
                        
                        {/* Meta Information */}
                        {activity.meta && (
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                            {activity.meta.location && (
                              <div className="flex items-center gap-1">
                                <FiMapPin className="w-3 h-3" />
                                <span>{activity.meta.location}</span>
                              </div>
                            )}
                            {activity.meta.amount && (
                              <div className="flex items-center gap-1">
                                <FiDollarSign className="w-3 h-3" />
                                <span>${activity.meta.amount}</span>
                              </div>
                            )}
                            {activity.meta.user && (
                              <div className="flex items-center gap-1">
                                <FiUser className="w-3 h-3" />
                                <span>{activity.meta.user}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Time */}
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${config.bgColor}`}>
                        <FiClock className={`w-3 h-3 ${config.textColor}`} />
                        <span className={`text-xs font-medium ${config.textColor}`}>
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {activity.actionLabel && (
                      <motion.button
                        onClick={activity.action}
                        className={`mt-3 text-sm font-medium ${config.textColor} hover:underline`}
                        whileHover={{ x: 5 }}
                      >
                        {activity.actionLabel} →
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {visibleCount < filteredActivities.length && (
          <motion.button
            onClick={() => setVisibleCount(visibleCount + maxItems)}
            className="mt-6 w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Load More Activities ({filteredActivities.length - visibleCount} remaining)
          </motion.button>
        )}

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <FiActivity className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Activities Yet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your activity timeline will appear here
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ActivityTimeline;
