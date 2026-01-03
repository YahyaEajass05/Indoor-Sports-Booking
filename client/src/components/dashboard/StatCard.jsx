import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

/**
 * StatCard - Advanced statistics card with animations and trend indicators
 * Features:
 * - Gradient backgrounds
 * - Trend indicators with percentage change
 * - Animated counter effect
 * - Icon support
 * - Hover effects
 * - Multiple size variants
 */
const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = 'from-blue-500 to-cyan-500',
  prefix = '',
  suffix = '',
  size = 'default',
  animated = true,
  className = '',
  onClick,
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend === 'up') return <FiTrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <FiTrendingDown className="w-4 h-4" />;
    return <FiMinus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
    if (trend === 'down') return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
    return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
  };

  const sizeClasses = {
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
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
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: 'spring',
        stiffness: 400,
      },
    },
  };

  const valueVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={animated ? cardVariants : {}}
      initial={animated ? 'hidden' : false}
      animate="visible"
      whileHover="hover"
      onClick={onClick}
      className={`relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      } ${sizeClasses[size]} ${className}`}
    >
      {/* Gradient Overlay */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 blur-3xl`} />
      
      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          {/* Title */}
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {title}
          </p>

          {/* Value */}
          <motion.div
            variants={animated ? valueVariants : {}}
            className="flex items-baseline gap-2 mb-3"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {prefix}{value}{suffix}
            </h3>
          </motion.div>

          {/* Trend Indicator */}
          {trend && trendValue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getTrendColor()}`}
            >
              {getTrendIcon()}
              <span>{trendValue}</span>
            </motion.div>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <motion.div
            variants={animated ? iconVariants : {}}
            className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
        )}
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />

      {/* Hover Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0`}
        whileHover={{ opacity: 0.05 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default StatCard;
