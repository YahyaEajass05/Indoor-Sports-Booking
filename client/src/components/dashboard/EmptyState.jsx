import { motion } from 'framer-motion';
import {
  FiInbox,
  FiSearch,
  FiCalendar,
  FiBookmark,
  FiCreditCard,
  FiUsers,
  FiGrid,
  FiPackage,
  FiAlertCircle,
  FiPlus,
} from 'react-icons/fi';

/**
 * EmptyState - Beautiful empty state component with illustrations and CTAs
 * Features:
 * - Multiple preset variants
 * - Custom icon support
 * - Animated entrance
 * - Action buttons
 * - Responsive design
 */
const EmptyState = ({
  variant = 'default',
  icon: CustomIcon,
  title,
  description,
  action,
  actionLabel = 'Get Started',
  secondaryAction,
  secondaryActionLabel,
  illustration,
  className = '',
}) => {
  const variants = {
    default: {
      icon: FiInbox,
      title: 'No data available',
      description: 'Get started by adding your first item',
      color: 'from-gray-400 to-gray-600',
    },
    search: {
      icon: FiSearch,
      title: 'No results found',
      description: 'Try adjusting your search or filters',
      color: 'from-blue-400 to-cyan-600',
    },
    bookings: {
      icon: FiCalendar,
      title: 'No bookings yet',
      description: 'Start by booking your first court',
      color: 'from-green-400 to-emerald-600',
    },
    saved: {
      icon: FiBookmark,
      title: 'No saved courts',
      description: 'Save your favorite courts for quick access',
      color: 'from-yellow-400 to-orange-600',
    },
    payments: {
      icon: FiCreditCard,
      title: 'No payment history',
      description: 'Your payment transactions will appear here',
      color: 'from-purple-400 to-pink-600',
    },
    users: {
      icon: FiUsers,
      title: 'No users found',
      description: 'Start by adding your first user',
      color: 'from-indigo-400 to-purple-600',
    },
    courts: {
      icon: FiGrid,
      title: 'No courts available',
      description: 'Add your first court to get started',
      color: 'from-orange-400 to-red-600',
    },
    error: {
      icon: FiAlertCircle,
      title: 'Something went wrong',
      description: 'We encountered an error loading this data',
      color: 'from-red-400 to-pink-600',
    },
  };

  const config = variants[variant] || variants.default;
  const Icon = CustomIcon || config.icon;
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalColor = config.color;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}
    >
      {/* Icon/Illustration */}
      {illustration ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          {illustration}
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="relative mb-6"
        >
          {/* Glow Effect */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${finalColor} opacity-20 blur-3xl`} />
          
          {/* Icon Container */}
          <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${finalColor} flex items-center justify-center shadow-2xl`}>
            <Icon className="w-12 h-12 text-white" />
            
            {/* Pulse Animation */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${finalColor}`}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Title */}
      <motion.h3
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center"
      >
        {finalTitle}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6"
      >
        {finalDescription}
      </motion.p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          {action && (
            <motion.button
              onClick={action}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${finalColor} text-white font-semibold shadow-lg hover:shadow-xl transition-all`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus className="w-5 h-5" />
              {actionLabel}
            </motion.button>
          )}
          
          {secondaryAction && (
            <motion.button
              onClick={secondaryAction}
              className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {secondaryActionLabel}
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${finalColor} opacity-20`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyState;
