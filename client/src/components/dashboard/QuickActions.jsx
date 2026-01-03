import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiCalendar,
  FiCreditCard,
  FiMapPin,
  FiUser,
  FiSettings,
  FiBookmark,
  FiClock,
  FiActivity,
  FiTrendingUp,
  FiDollarSign,
  FiGift,
  FiBell,
  FiUsers,
  FiGrid,
  FiPieChart,
  FiFileText,
  FiZap,
  FiPlus,
  FiEdit,
  FiEye,
  FiDownload,
  FiShare2,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

/**
 * QuickActions - Animated quick action buttons for common tasks
 * Features:
 * - Role-based actions
 * - Animated entrance
 * - Hover effects with icon animation
 * - Gradient backgrounds
 * - Click handlers
 * - Customizable grid layout
 */
const QuickActions = ({ userRole = 'user', variant = 'grid', className = '' }) => {
  const navigate = useNavigate();
  const [hoveredAction, setHoveredAction] = useState(null);

  const roleActions = {
    user: [
      {
        id: 'book-court',
        label: 'Book Court',
        description: 'Reserve a court now',
        icon: FiCalendar,
        color: 'from-blue-500 to-cyan-500',
        action: () => navigate('/courts'),
      },
      {
        id: 'view-bookings',
        label: 'My Bookings',
        description: 'View your reservations',
        icon: FiClock,
        color: 'from-green-500 to-emerald-500',
        action: () => navigate('/dashboard/user/upcoming-bookings'),
      },
      {
        id: 'find-courts',
        label: 'Find Courts',
        description: 'Search nearby venues',
        icon: FiMapPin,
        color: 'from-purple-500 to-pink-500',
        action: () => navigate('/courts'),
      },
      {
        id: 'payments',
        label: 'Payments',
        description: 'Payment history',
        icon: FiCreditCard,
        color: 'from-orange-500 to-red-500',
        action: () => navigate('/dashboard/user/payments'),
      },
      {
        id: 'saved-courts',
        label: 'Saved Courts',
        description: 'Your favorites',
        icon: FiBookmark,
        color: 'from-yellow-500 to-orange-500',
        action: () => navigate('/dashboard/user/saved-courts'),
      },
      {
        id: 'profile',
        label: 'Profile',
        description: 'Manage account',
        icon: FiUser,
        color: 'from-teal-500 to-green-500',
        action: () => navigate('/dashboard/user/profile'),
      },
    ],
    owner: [
      {
        id: 'add-court',
        label: 'Add Court',
        description: 'List a new venue',
        icon: FiPlus,
        color: 'from-blue-500 to-cyan-500',
        action: () => navigate('/dashboard/owner/manage-courts'),
      },
      {
        id: 'manage-bookings',
        label: 'Bookings',
        description: 'View all bookings',
        icon: FiCalendar,
        color: 'from-green-500 to-emerald-500',
        action: () => navigate('/dashboard/owner/bookings'),
      },
      {
        id: 'edit-courts',
        label: 'Edit Courts',
        description: 'Manage your venues',
        icon: FiEdit,
        color: 'from-purple-500 to-pink-500',
        action: () => navigate('/dashboard/owner/manage-courts'),
      },
      {
        id: 'revenue',
        label: 'Revenue',
        description: 'View earnings',
        icon: FiTrendingUp,
        color: 'from-orange-500 to-red-500',
        action: () => navigate('/dashboard/owner/revenue'),
      },
      {
        id: 'promotions',
        label: 'Promotions',
        description: 'Create offers',
        icon: FiGift,
        color: 'from-yellow-500 to-orange-500',
        action: () => navigate('/dashboard/owner/promotions'),
      },
      {
        id: 'payouts',
        label: 'Payouts',
        description: 'Withdraw funds',
        icon: FiDollarSign,
        color: 'from-teal-500 to-green-500',
        action: () => navigate('/dashboard/owner/payouts'),
      },
    ],
    admin: [
      {
        id: 'manage-users',
        label: 'Manage Users',
        description: 'User management',
        icon: FiUsers,
        color: 'from-blue-500 to-cyan-500',
        action: () => navigate('/dashboard/admin/users'),
      },
      {
        id: 'manage-courts',
        label: 'Manage Courts',
        description: 'Court oversight',
        icon: FiGrid,
        color: 'from-green-500 to-emerald-500',
        action: () => navigate('/dashboard/admin/courts'),
      },
      {
        id: 'view-reports',
        label: 'Reports',
        description: 'Analytics & insights',
        icon: FiPieChart,
        color: 'from-purple-500 to-pink-500',
        action: () => navigate('/dashboard/admin/reports'),
      },
      {
        id: 'audit-logs',
        label: 'Audit Logs',
        description: 'System activity',
        icon: FiFileText,
        color: 'from-orange-500 to-red-500',
        action: () => navigate('/dashboard/admin/audit-logs'),
      },
      {
        id: 'promotions',
        label: 'Promotions',
        description: 'Manage offers',
        icon: FiGift,
        color: 'from-yellow-500 to-orange-500',
        action: () => navigate('/dashboard/admin/promotions'),
      },
      {
        id: 'system-settings',
        label: 'Settings',
        description: 'System config',
        icon: FiSettings,
        color: 'from-teal-500 to-green-500',
        action: () => navigate('/dashboard/admin/system-settings'),
      },
    ],
  };

  const actions = roleActions[userRole] || roleActions.user;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const glowVariants = {
    rest: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 0.3,
      scale: 1.2,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (variant === 'list') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`space-y-2 ${className}`}
      >
        {actions.map((action) => (
          <motion.button
            key={action.id}
            variants={itemVariants}
            onClick={action.action}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
          >
            <motion.div
              className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg relative overflow-hidden`}
            >
              <motion.div
                variants={glowVariants}
                initial="rest"
                animate={hoveredAction === action.id ? 'hover' : 'rest'}
                className={`absolute inset-0 bg-gradient-to-br ${action.color} blur-xl`}
              />
              <motion.div
                variants={iconVariants}
                initial="rest"
                animate={hoveredAction === action.id ? 'hover' : 'rest'}
              >
                <action.icon className="w-6 h-6 text-white relative z-10" />
              </motion.div>
            </motion.div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {action.label}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </div>
            <FiZap className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
          </motion.button>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}
    >
      {actions.map((action) => (
        <motion.button
          key={action.id}
          variants={itemVariants}
          onClick={action.action}
          onMouseEnter={() => setHoveredAction(action.id)}
          onMouseLeave={() => setHoveredAction(null)}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Gradient Background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            {/* Glow Effect */}
            <motion.div
              variants={glowVariants}
              initial="rest"
              animate={hoveredAction === action.id ? 'hover' : 'rest'}
              className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${action.color} blur-3xl`}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}
                variants={iconVariants}
                initial="rest"
                animate={hoveredAction === action.id ? 'hover' : 'rest'}
              >
                <action.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Label */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                  {action.label}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </div>

              {/* Hover Arrow */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={
                  hoveredAction === action.id
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -10 }
                }
                className="absolute bottom-2 right-2"
              >
                <FiZap className={`w-4 h-4 text-transparent bg-gradient-to-br ${action.color} bg-clip-text`} />
              </motion.div>
            </div>

            {/* Bottom Accent */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${action.color}`}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuickActions;
