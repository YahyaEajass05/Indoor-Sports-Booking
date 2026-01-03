import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiCalendar,
  FiCreditCard,
  FiUser,
  FiSettings,
  FiBookmark,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiPackage,
  FiActivity,
  FiPieChart,
  FiBell,
  FiShield,
  FiFileText,
  FiChevronDown,
  FiChevronRight,
  FiLogOut,
  FiZap,
  FiGift,
  FiTarget,
  FiMapPin,
  FiGrid,
} from 'react-icons/fi';

/**
 * DashboardSidebar - Advanced collapsible sidebar with role-based navigation
 * Features:
 * - Role-based menu items (admin, owner, user)
 * - Collapsible submenu support
 * - Active route highlighting
 * - Smooth animations
 * - Mobile responsive
 * - Badge notifications
 */
const DashboardSidebar = ({
  isOpen,
  isCollapsed,
  isMobileMenuOpen,
  onToggle,
  onClose,
  userRole = 'user',
  user,
}) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  // Menu items configuration based on role
  const getMenuItems = () => {
    const roleMenus = {
      user: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: FiHome,
          path: '/dashboard/user',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          id: 'bookings',
          label: 'My Bookings',
          icon: FiCalendar,
          color: 'from-green-500 to-emerald-500',
          submenu: [
            { label: 'Upcoming', path: '/dashboard/user/upcoming-bookings', icon: FiClock },
            { label: 'History', path: '/dashboard/user/booking-history', icon: FiActivity },
            { label: 'Cancelled', path: '/dashboard/user/cancelled-bookings', icon: FiFileText },
          ],
        },
        {
          id: 'courts',
          label: 'Find Courts',
          icon: FiMapPin,
          path: '/courts',
          color: 'from-purple-500 to-pink-500',
        },
        {
          id: 'saved',
          label: 'Saved Courts',
          icon: FiBookmark,
          path: '/dashboard/user/saved-courts',
          color: 'from-orange-500 to-red-500',
          badge: '5',
        },
        {
          id: 'payments',
          label: 'Payments',
          icon: FiCreditCard,
          path: '/dashboard/user/payments',
          color: 'from-indigo-500 to-purple-500',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: FiBell,
          path: '/dashboard/user/notifications',
          color: 'from-yellow-500 to-orange-500',
          badge: '3',
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: FiUser,
          path: '/dashboard/user/profile',
          color: 'from-teal-500 to-green-500',
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: FiSettings,
          path: '/dashboard/user/security-settings',
          color: 'from-gray-500 to-slate-500',
        },
      ],
      owner: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: FiHome,
          path: '/dashboard/owner',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          id: 'courts',
          label: 'My Courts',
          icon: FiGrid,
          path: '/dashboard/owner/manage-courts',
          color: 'from-green-500 to-emerald-500',
        },
        {
          id: 'bookings',
          label: 'Bookings',
          icon: FiCalendar,
          path: '/dashboard/owner/bookings',
          color: 'from-purple-500 to-pink-500',
          badge: '12',
        },
        {
          id: 'availability',
          label: 'Availability',
          icon: FiClock,
          path: '/dashboard/owner/court-availability',
          color: 'from-orange-500 to-red-500',
        },
        {
          id: 'revenue',
          label: 'Revenue',
          icon: FiTrendingUp,
          path: '/dashboard/owner/revenue',
          color: 'from-indigo-500 to-purple-500',
        },
        {
          id: 'payouts',
          label: 'Payouts',
          icon: FiDollarSign,
          path: '/dashboard/owner/payouts',
          color: 'from-green-500 to-teal-500',
        },
        {
          id: 'promotions',
          label: 'Promotions',
          icon: FiGift,
          path: '/dashboard/owner/promotions',
          color: 'from-yellow-500 to-orange-500',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: FiBell,
          path: '/dashboard/owner/notifications',
          color: 'from-red-500 to-pink-500',
          badge: '7',
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: FiUser,
          path: '/dashboard/owner/profile',
          color: 'from-teal-500 to-green-500',
        },
      ],
      admin: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: FiHome,
          path: '/dashboard/admin',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          id: 'users',
          label: 'Users',
          icon: FiUsers,
          path: '/dashboard/admin/users',
          color: 'from-purple-500 to-pink-500',
          badge: '245',
        },
        {
          id: 'owners',
          label: 'Court Owners',
          icon: FiShield,
          path: '/dashboard/admin/owners',
          color: 'from-green-500 to-emerald-500',
        },
        {
          id: 'courts',
          label: 'Courts',
          icon: FiGrid,
          path: '/dashboard/admin/courts',
          color: 'from-orange-500 to-red-500',
        },
        {
          id: 'bookings',
          label: 'Bookings',
          icon: FiCalendar,
          path: '/dashboard/admin/bookings',
          color: 'from-indigo-500 to-purple-500',
        },
        {
          id: 'promotions',
          label: 'Promotions',
          icon: FiGift,
          path: '/dashboard/admin/promotions',
          color: 'from-yellow-500 to-orange-500',
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: FiPieChart,
          path: '/dashboard/admin/reports',
          color: 'from-teal-500 to-green-500',
        },
        {
          id: 'audit',
          label: 'Audit Logs',
          icon: FiFileText,
          path: '/dashboard/admin/audit-logs',
          color: 'from-red-500 to-pink-500',
        },
        {
          id: 'system',
          label: 'System Settings',
          icon: FiSettings,
          path: '/dashboard/admin/system-settings',
          color: 'from-gray-500 to-slate-500',
        },
      ],
    };

    return roleMenus[userRole] || roleMenus.user;
  };

  const menuItems = getMenuItems();

  const toggleSubmenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isActive = (path) => location.pathname === path;
  const isParentActive = (submenu) => submenu?.some((item) => location.pathname === item.path);

  const sidebarWidth = isCollapsed ? '80px' : '280px';

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className={`hidden lg:block fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl z-50 overflow-hidden`}
        initial={{ width: sidebarWidth }}
        animate={{ width: sidebarWidth }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />

        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FiZap className="w-7 h-7 text-white" />
              </motion.div>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    CourtBook
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
                  </p>
                </motion.div>
              )}
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
            {menuItems.map((item, index) => (
              <div key={item.id}>
                {item.submenu ? (
                  // Menu with submenu
                  <div>
                    <motion.button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                        isParentActive(item.submenu)
                          ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          isParentActive(item.submenu)
                            ? 'bg-white/20'
                            : 'bg-gradient-to-br ' + item.color
                        }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            isParentActive(item.submenu) ? 'text-white' : 'text-white'
                          }`}
                        />
                      </div>
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                          <motion.div
                            animate={{ rotate: expandedMenus[item.id] ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiChevronDown className="w-4 h-4" />
                          </motion.div>
                        </>
                      )}
                    </motion.button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {!isCollapsed && expandedMenus[item.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <motion.div
                              key={subIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: subIndex * 0.05 }}
                            >
                              <Link
                                to={subItem.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                  isActive(subItem.path)
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                                }`}
                              >
                                <subItem.icon className="w-4 h-4" />
                                <span className="text-sm">{subItem.label}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Regular menu item
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <motion.div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive(item.path) ? 'bg-white/20' : 'bg-gradient-to-br ' + item.color
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <item.icon
                          className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-white'}`}
                        />
                      </motion.div>
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 font-medium text-sm">{item.label}</span>
                          {item.badge && (
                            <motion.span
                              className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                                isActive(item.path)
                                  ? 'bg-white/20 text-white'
                                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                              }`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </>
                      )}

                      {/* Tooltip for collapsed sidebar */}
                      {isCollapsed && hoveredItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50"
                        >
                          {item.label}
                          {item.badge && (
                            <span className="ml-2 px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* User Profile Section */}
          {!isCollapsed && (
            <motion.div
              className="p-4 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center text-white font-semibold shadow-lg">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {user?.name || 'User Name'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">View Profile</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <motion.button
          onClick={onToggle}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-r-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight
            className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
              isCollapsed ? '' : 'rotate-180'
            }`}
          />
        </motion.button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-screen w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Same content as desktop sidebar but without collapse functionality */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />

              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                        <FiZap className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                          CourtBook
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <svg
                        className="w-6 h-6 text-gray-600 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                  {menuItems.map((item, index) => (
                    <div key={item.id}>
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                              isParentActive(item.submenu)
                                ? 'bg-gradient-to-r ' + item.color + ' text-white'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isParentActive(item.submenu)
                                  ? 'bg-white/20'
                                  : 'bg-gradient-to-br ' + item.color
                              }`}
                            >
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                            <FiChevronDown
                              className={`w-4 h-4 transition-transform ${
                                expandedMenus[item.id] ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {expandedMenus[item.id] && (
                            <div className="ml-6 mt-1 space-y-1">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.path}
                                  to={subItem.path}
                                  onClick={onClose}
                                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                                    isActive(subItem.path)
                                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                                  }`}
                                >
                                  <subItem.icon className="w-4 h-4" />
                                  <span className="text-sm">{subItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                            isActive(item.path)
                              ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isActive(item.path) ? 'bg-white/20' : 'bg-gradient-to-br ' + item.color
                            }`}
                          >
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="flex-1 font-medium text-sm">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                                isActive(item.path)
                                  ? 'bg-white/20 text-white'
                                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
