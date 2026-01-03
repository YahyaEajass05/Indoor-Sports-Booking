import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMoon,
  FiSun,
  FiCommand,
  FiMessageSquare,
  FiHelpCircle,
  FiChevronDown,
  FiActivity,
  FiCalendar,
  FiCreditCard,
  FiShield,
  FiZap,
  FiTrendingUp,
  FiGift,
  FiAward,
  FiBookmark,
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

/**
 * DashboardHeader - Advanced header component with search, notifications, and user menu
 * Features:
 * - Global search with suggestions
 * - Real-time notifications with grouping
 * - User profile dropdown with quick actions
 * - Theme toggle
 * - Command palette trigger
 * - Responsive design
 */
const DashboardHeader = ({ onMenuToggle, onCommandPaletteOpen, user, isSidebarCollapsed }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Sample notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'booking',
        title: 'Booking Confirmed',
        message: 'Your court booking for Basketball Court A is confirmed',
        time: '2 minutes ago',
        unread: true,
        icon: FiCalendar,
        color: 'from-green-500 to-emerald-500',
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of $50 has been processed successfully',
        time: '1 hour ago',
        unread: true,
        icon: FiCreditCard,
        color: 'from-blue-500 to-cyan-500',
      },
      {
        id: 3,
        type: 'promotion',
        title: 'Special Offer!',
        message: 'Get 20% off on your next booking',
        time: '3 hours ago',
        unread: false,
        icon: FiGift,
        color: 'from-purple-500 to-pink-500',
      },
      {
        id: 4,
        type: 'achievement',
        title: 'Achievement Unlocked',
        message: 'You\'ve completed 10 bookings! Claim your reward',
        time: '1 day ago',
        unread: false,
        icon: FiAward,
        color: 'from-yellow-500 to-orange-500',
      },
    ];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => n.unread).length);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification) => {
    // Mark as read and navigate
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, unread: false } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
    // Navigate based on notification type
    // navigate(`/dashboard/${notification.type}`);
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
    navigate('/login');
  };

  const searchSuggestions = [
    { icon: FiCalendar, label: 'Book a Court', path: '/dashboard/book' },
    { icon: FiActivity, label: 'View Bookings', path: '/dashboard/bookings' },
    { icon: FiCreditCard, label: 'Payment History', path: '/dashboard/payments' },
    { icon: FiSettings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <motion.header
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section - Menu Toggle & Search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Menu Toggle */}
            <motion.button
              onClick={onMenuToggle}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl" ref={searchRef}>
              <motion.div
                className={`relative ${isSearchFocused ? 'scale-105' : 'scale-100'} transition-transform`}
              >
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything... (⌘K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 outline-none transition-all"
                />
                <kbd
                  onClick={onCommandPaletteOpen}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-200 dark:bg-gray-700 dark:text-gray-400 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <FiCommand className="w-3 h-3" /> K
                </kbd>
              </motion.div>

              {/* Search Suggestions Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2">
                        Quick Actions
                      </div>
                      {searchSuggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          onClick={() => navigate(suggestion.path)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
                            <suggestion.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {suggestion.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                  >
                    <FiMoon className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                  >
                    <FiSun className="w-5 h-5 text-orange-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Help Button */}
            <motion.button
              className="hidden md:flex p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                            notification.unread ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${notification.color} flex items-center justify-center text-white shadow-lg`}>
                              <notification.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  {notification.title}
                                </h4>
                                {notification.unread && (
                                  <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1" />
                                )}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 text-center border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to="/dashboard/notifications"
                        className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                        onClick={() => setShowNotifications(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  {user?.name?.[0] || 'U'}
                </div>
                <FiChevronDown className="hidden sm:block w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    {/* User Info */}
                    <div className="p-4 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                          {user?.name?.[0] || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {user?.name || 'User Name'}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {user?.email || 'user@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {[
                        { icon: FiUser, label: 'Profile', path: '/dashboard/profile' },
                        { icon: FiBookmark, label: 'Saved Courts', path: '/dashboard/saved' },
                        { icon: FiActivity, label: 'My Bookings', path: '/dashboard/bookings' },
                        { icon: FiCreditCard, label: 'Payments', path: '/dashboard/payments' },
                        { icon: FiSettings, label: 'Settings', path: '/dashboard/settings' },
                      ].map((item, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            navigate(item.path);
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {item.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                      <motion.button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <FiLogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.header>
  );
};

export default DashboardHeader;
