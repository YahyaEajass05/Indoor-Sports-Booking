import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiZap, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

/**
 * AuthNavbar - Navigation bar for authentication pages
 * Features:
 * - Logo with link to home
 * - Login/Sign Up buttons
 * - Theme toggle
 * - Glassmorphism design
 * - Dark mode support
 */
const AuthNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth/login';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiZap className="text-xl text-white" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              CourtBooker
            </span>
          </Link>

          {/* Right Side - Auth Buttons & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>

            {/* Auth Buttons */}
            {isLoginPage ? (
              // Show Sign Up button on login page
              <Link to="/auth/register">
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </Link>
            ) : (
              // Show Login button on other auth pages
              <Link to="/auth/login">
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
