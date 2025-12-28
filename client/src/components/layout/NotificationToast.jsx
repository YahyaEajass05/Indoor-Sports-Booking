import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const NotificationToast = ({ 
  notifications = [], 
  onClose, 
  position = 'top-right',
  autoClose = 5000 
}) => {
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const typeStyles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: 'text-green-500',
      iconBg: 'bg-green-100',
      path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: 'text-red-500',
      iconBg: 'bg-red-100',
      path: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-500',
      iconBg: 'bg-yellow-100',
      path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-500',
      iconBg: 'bg-blue-100',
      path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  };

  useEffect(() => {
    if (autoClose && notifications.length > 0) {
      const timer = setTimeout(() => {
        onClose(notifications[0].id);
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [notifications, autoClose, onClose]);

  return (
    <div className={`fixed ${positions[position]} z-[200] space-y-4 max-w-md`}>
      <AnimatePresence>
        {notifications.map((notification, index) => {
          const style = typeStyles[notification.type] || typeStyles.info;
          
          return (
            <motion.div
              key={notification.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`${style.bg} border-2 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm`}
            >
              <div className="flex items-start p-4">
                {/* Icon */}
                <motion.div
                  className={`flex-shrink-0 w-10 h-10 ${style.iconBg} rounded-lg flex items-center justify-center`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                >
                  <svg 
                    className={`w-6 h-6 ${style.icon}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={style.path} 
                    />
                  </svg>
                </motion.div>

                {/* Content */}
                <div className="ml-3 flex-1">
                  <motion.h4
                    className="text-sm font-semibold text-gray-900"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {notification.title}
                  </motion.h4>
                  <motion.p
                    className="mt-1 text-sm text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {notification.message}
                  </motion.p>
                </div>

                {/* Close button */}
                <motion.button
                  onClick={() => onClose(notification.id)}
                  className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Progress bar */}
              {autoClose && (
                <motion.div
                  className="h-1 bg-gray-200"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: autoClose / 1000, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                >
                  <div className={`h-full ${style.icon.replace('text-', 'bg-')}`} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
