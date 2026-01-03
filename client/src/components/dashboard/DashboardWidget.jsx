import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMoreVertical, FiMaximize2, FiMinimize2, FiX, FiRefreshCw } from 'react-icons/fi';

/**
 * DashboardWidget - Customizable widget container for dashboard
 * Features:
 * - Draggable (requires external library like react-grid-layout)
 * - Resizable
 * - Expandable to full screen
 * - Refresh functionality
 * - Custom actions menu
 * - Loading states
 */
const DashboardWidget = ({
  title,
  subtitle,
  icon: Icon,
  children,
  actions = [],
  onRefresh,
  onRemove,
  isLoading = false,
  color = 'from-blue-500 to-cyan-500',
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <motion.div
        layout
        className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden ${
          isExpanded ? 'fixed inset-4 z-50' : ''
        } ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r ${color} bg-opacity-5`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {Icon && (
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {onRefresh && (
                <motion.button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={isRefreshing ? { rotate: 360 } : {}}
                  transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
                >
                  <FiRefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.button>
              )}

              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isExpanded ? (
                  <FiMinimize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <FiMaximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </motion.button>

              {(actions.length > 0 || onRemove) && (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiMoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </motion.button>

                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                      onMouseLeave={() => setShowMenu(false)}
                    >
                      {actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            action.onClick();
                            setShowMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-left"
                        >
                          {action.icon && <action.icon className="w-4 h-4" />}
                          <span className="text-sm">{action.label}</span>
                        </button>
                      ))}
                      {onRemove && (
                        <button
                          onClick={() => {
                            onRemove();
                            setShowMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors border-t border-gray-200 dark:border-gray-700"
                        >
                          <FiX className="w-4 h-4" />
                          <span className="text-sm">Remove Widget</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`${isExpanded ? 'h-[calc(100vh-8rem)] overflow-y-auto' : ''}`}>
          {isLoading ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <motion.div
                className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">Loading...</p>
            </div>
          ) : (
            children
          )}
        </div>
      </motion.div>

      {/* Backdrop for expanded widget */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}
    </>
  );
};

export default DashboardWidget;
