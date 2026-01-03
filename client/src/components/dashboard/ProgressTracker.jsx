import { motion } from 'framer-motion';
import { FiCheck, FiCircle, FiClock } from 'react-icons/fi';

/**
 * ProgressTracker - Milestone-based progress tracking component
 * Features:
 * - Multiple step states (completed, current, pending)
 * - Animated progress line
 * - Milestone details with icons
 * - Responsive vertical/horizontal layouts
 * - Custom colors per milestone
 */
const ProgressTracker = ({
  steps = [],
  currentStep = 0,
  orientation = 'horizontal',
  showDetails = true,
  animated = true,
  className = '',
}) => {
  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (status, icon) => {
    if (status === 'completed') return FiCheck;
    if (status === 'current') return icon || FiClock;
    return icon || FiCircle;
  };

  const getStepColor = (status, customColor) => {
    if (status === 'completed') return customColor || 'from-green-500 to-emerald-500';
    if (status === 'current') return customColor || 'from-blue-500 to-cyan-500';
    return 'from-gray-300 to-gray-400';
  };

  if (orientation === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const Icon = getStepIcon(status, step.icon);
          const color = getStepColor(status, step.color);
          const isLast = index === steps.length - 1;

          return (
            <motion.div
              key={index}
              initial={animated ? { opacity: 0, x: -20 } : false}
              animate={animated ? { opacity: 1, x: 0 } : false}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-4"
            >
              {/* Connector Line */}
              {!isLast && (
                <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className={`w-full bg-gradient-to-b ${
                      status === 'completed' ? 'from-green-500 to-emerald-500' : 'from-transparent to-transparent'
                    }`}
                    initial={{ height: 0 }}
                    animate={{ height: status === 'completed' ? '100%' : 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  />
                </div>
              )}

              {/* Step Icon */}
              <motion.div
                className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1 }}
                initial={animated ? { scale: 0, rotate: -180 } : false}
                animate={animated ? { scale: 1, rotate: 0 } : false}
                transition={{ delay: index * 0.1, type: 'spring' }}
              >
                <Icon className="w-6 h-6 text-white" />
                {status === 'current' && (
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${color}`}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Step Content */}
              <div className="flex-1 pb-8">
                <motion.div
                  initial={animated ? { opacity: 0, y: 10 } : false}
                  animate={animated ? { opacity: 1, y: 0 } : false}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  className={`p-4 rounded-xl border transition-all ${
                    status === 'current'
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {step.title}
                    </h4>
                    {step.badge && (
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        status === 'completed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : status === 'current'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {step.badge}
                      </span>
                    )}
                  </div>
                  {showDetails && step.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {step.description}
                    </p>
                  )}
                  {step.timestamp && (
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {step.timestamp}
                    </p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Horizontal Layout
  return (
    <div className={`${className}`}>
      {/* Steps Container */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const Icon = getStepIcon(status, step.icon);
            const color = getStepColor(status, step.color);

            return (
              <motion.div
                key={index}
                initial={animated ? { opacity: 0, y: 20 } : false}
                animate={animated ? { opacity: 1, y: 0 } : false}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
                style={{ width: `${100 / steps.length}%` }}
              >
                {/* Step Icon */}
                <motion.div
                  className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-3`}
                  whileHover={{ scale: 1.1 }}
                  initial={animated ? { scale: 0, rotate: -180 } : false}
                  animate={animated ? { scale: 1, rotate: 0 } : false}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                >
                  <Icon className="w-6 h-6 text-white" />
                  {status === 'current' && (
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${color}`}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Step Details */}
                {showDetails && (
                  <motion.div
                    initial={animated ? { opacity: 0 } : false}
                    animate={animated ? { opacity: 1 } : false}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="text-center"
                  >
                    <h4 className={`text-sm font-semibold mb-1 ${
                      status === 'pending'
                        ? 'text-gray-500 dark:text-gray-500'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {step.title}
                    </h4>
                    {step.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 max-w-[150px]">
                        {step.description}
                      </p>
                    )}
                    {step.timestamp && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {step.timestamp}
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current Step Details Card */}
      {showDetails && steps[currentStep] && (() => {
        const CurrentStepIcon = steps[currentStep].icon;
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800"
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${getStepColor('current', steps[currentStep].color)} flex items-center justify-center shadow-lg`}>
                {CurrentStepIcon && <CurrentStepIcon className="w-6 h-6 text-white" />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Current: {steps[currentStep].title}
                </h3>
                {steps[currentStep].detailedDescription && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {steps[currentStep].detailedDescription}
                  </p>
                )}
                {steps[currentStep].action && (
                  <motion.button
                    onClick={steps[currentStep].action}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {steps[currentStep].actionLabel || 'Continue'}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })()}
    </div>
  );
};

export default ProgressTracker;
