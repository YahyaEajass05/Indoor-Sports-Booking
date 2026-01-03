import { motion } from 'framer-motion';
import PublicBackground from '../../components/layout/PublicBackground';
import { FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';

/**
 * AuthPageWrapper - Reusable wrapper for all auth pages
 * Provides consistent dark mode support and animated background
 */
const AuthPageWrapper = ({ 
  children, 
  title, 
  subtitle, 
  showBranding = true,
  leftContent = null 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background */}
      <PublicBackground variant="gradient" />

      {/* Main Content Container */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding (optional) */}
          {showBranding && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              {leftContent || (
                <>
                  {/* Logo */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <FiZap className="text-3xl text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold gradient-text-animated">CourtBooker</h1>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Indoor Sports Booking</p>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {title || 'Welcome to CourtBooker'}
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8">
                    {subtitle || 'Book your favorite indoor sports courts with ease'}
                  </p>
                </>
              )}
            </motion.div>
          )}

          {/* Right Side - Form Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 lg:p-12 shadow-2xl">
              {children}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Home Link */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="hidden sm:inline font-medium">Back to Home</span>
      </Link>
    </div>
  );
};

export default AuthPageWrapper;
