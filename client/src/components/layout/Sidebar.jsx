import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onClose, userRole = 'user' }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Define menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
        path: `/dashboard/${userRole}`,
        color: 'from-blue-500 to-cyan-500',
      },
    ];

    const roleSpecificItems = {
      admin: [
        {
          id: 'users',
          label: 'Users',
          icon: 'users',
          path: '/dashboard/admin/users',
          color: 'from-purple-500 to-pink-500',
          badge: '245',
        },
        {
          id: 'owners',
          label: 'Owners',
          icon: 'building',
          path: '/dashboard/admin/owners',
          color: 'from-green-500 to-emerald-500',
        },
        {
          id: 'courts',
          label: 'Courts Management',
          icon: 'court',
          color: 'from-orange-500 to-red-500',
          submenu: [
            { label: 'All Courts', path: '/dashboard/admin/courts' },
            { label: 'Pending Approval', path: '/dashboard/admin/courts/pending', badge: '12' },
            { label: 'Court Analytics', path: '/dashboard/admin/courts/analytics' },
          ],
        },
        {
          id: 'bookings',
          label: 'Bookings',
          icon: 'calendar',
          path: '/dashboard/admin/bookings',
          color: 'from-indigo-500 to-purple-500',
          badge: '89',
        },
        {
          id: 'promotions',
          label: 'Promotions',
          icon: 'tag',
          path: '/dashboard/admin/promotions',
          color: 'from-yellow-500 to-orange-500',
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: 'chart',
          color: 'from-teal-500 to-green-500',
          submenu: [
            { label: 'Revenue Report', path: '/dashboard/admin/reports/revenue' },
            { label: 'User Analytics', path: '/dashboard/admin/reports/users' },
            { label: 'Booking Trends', path: '/dashboard/admin/reports/bookings' },
          ],
        },
        {
          id: 'settings',
          label: 'System Settings',
          icon: 'settings',
          path: '/dashboard/admin/settings',
          color: 'from-gray-500 to-slate-500',
        },
        {
          id: 'audit',
          label: 'Audit Logs',
          icon: 'shield',
          path: '/dashboard/admin/audit',
          color: 'from-red-500 to-pink-500',
        },
      ],
      owner: [
        {
          id: 'courts',
          label: 'My Courts',
          icon: 'court',
          path: '/dashboard/owner/courts',
          color: 'from-green-500 to-emerald-500',
          badge: '5',
        },
        {
          id: 'bookings',
          label: 'Bookings',
          icon: 'calendar',
          path: '/dashboard/owner/bookings',
          color: 'from-indigo-500 to-purple-500',
          badge: '23',
        },
        {
          id: 'availability',
          label: 'Availability',
          icon: 'clock',
          path: '/dashboard/owner/availability',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          id: 'revenue',
          label: 'Revenue',
          icon: 'chart',
          color: 'from-green-500 to-teal-500',
          submenu: [
            { label: 'Overview', path: '/dashboard/owner/revenue' },
            { label: 'Payouts', path: '/dashboard/owner/payouts' },
            { label: 'Transaction History', path: '/dashboard/owner/transactions' },
          ],
        },
        {
          id: 'promotions',
          label: 'Promotions',
          icon: 'tag',
          path: '/dashboard/owner/promotions',
          color: 'from-yellow-500 to-orange-500',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: 'bell',
          path: '/dashboard/owner/notifications',
          color: 'from-purple-500 to-pink-500',
          badge: '8',
        },
      ],
      user: [
        {
          id: 'bookings',
          label: 'My Bookings',
          icon: 'calendar',
          color: 'from-indigo-500 to-purple-500',
          submenu: [
            { label: 'Upcoming', path: '/dashboard/user/bookings/upcoming', badge: '3' },
            { label: 'History', path: '/dashboard/user/bookings/history' },
            { label: 'Cancelled', path: '/dashboard/user/bookings/cancelled' },
          ],
        },
        {
          id: 'saved',
          label: 'Saved Courts',
          icon: 'heart',
          path: '/dashboard/user/saved',
          color: 'from-red-500 to-pink-500',
          badge: '12',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: 'bell',
          path: '/dashboard/user/notifications',
          color: 'from-purple-500 to-pink-500',
          badge: '5',
        },
        {
          id: 'security',
          label: 'Security',
          icon: 'shield',
          path: '/dashboard/user/security',
          color: 'from-gray-500 to-slate-500',
        },
      ],
    };

    return [...commonItems, ...roleSpecificItems[userRole]];
  };

  const menuItems = getMenuItems();

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (submenu) => {
    return submenu?.some((item) => location.pathname === item.path);
  };

  // Icon components
  const getIcon = (iconName) => {
    const icons = {
      dashboard: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      ),
      users: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      ),
      building: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      ),
      court: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      ),
      calendar: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      ),
      tag: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      ),
      chart: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      ),
      settings: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      ),
      shield: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      heart: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
      bell: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      ),
      clock: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    };
    return icons[iconName] || icons.dashboard;
  };

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const submenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-white via-gray-50 to-white shadow-2xl z-50 overflow-hidden ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        style={{ marginTop: '80px' }}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 grid-bg" />
        </div>

        {/* Sidebar content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-lg font-bold gradient-text-animated">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">Manage your activities</p>
                </motion.div>
              )}
              <motion.button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-2 hide-scrollbar">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.submenu ? (
                    // Menu item with submenu
                    <div>
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                          isParentActive(item.submenu)
                            ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className={`relative ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center rounded-lg ${
                              isParentActive(item.submenu)
                                ? 'bg-white/20'
                                : 'bg-gradient-to-br ' + item.color
                            }`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'} ${isParentActive(item.submenu) ? 'text-white' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              {getIcon(item.icon)}
                            </svg>
                            {hoveredItem === item.id && (
                              <motion.div
                                className="absolute inset-0 rounded-lg bg-white/20"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </motion.div>
                          {!isCollapsed && (
                            <span className="font-medium text-sm">{item.label}</span>
                          )}
                        </div>
                        {!isCollapsed && (
                          <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            animate={{ rotate: expandedMenus[item.id] ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        )}
                      </button>

                      {/* Submenu */}
                      {!isCollapsed && (
                        <AnimatePresence>
                          {expandedMenus[item.id] && (
                            <motion.div
                              variants={submenuVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              className="mt-1 ml-4 space-y-1 overflow-hidden"
                            >
                              {item.submenu.map((subItem, subIndex) => (
                                <motion.div
                                  key={subItem.path}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.05 }}
                                >
                                  <Link
                                    to={subItem.path}
                                    className={`flex items-center justify-between p-2.5 pl-12 rounded-lg transition-all duration-200 ${
                                      isActive(subItem.path)
                                        ? 'bg-primary-50 text-primary-600 font-medium'
                                        : 'hover:bg-gray-50 text-gray-600'
                                    }`}
                                  >
                                    <span className="text-sm">{subItem.label}</span>
                                    {subItem.badge && (
                                      <motion.span
                                        className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                      >
                                        {subItem.badge}
                                      </motion.span>
                                    )}
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ) : (
                    // Regular menu item
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg transform scale-105'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className={`relative ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center rounded-lg ${
                            isActive(item.path)
                              ? 'bg-white/20'
                              : 'bg-gradient-to-br ' + item.color
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'} ${isActive(item.path) ? 'text-white' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {getIcon(item.icon)}
                          </svg>
                          {hoveredItem === item.id && (
                            <motion.div
                              className="absolute inset-0 rounded-lg bg-white/20"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.div>
                        {!isCollapsed && (
                          <span className="font-medium text-sm">{item.label}</span>
                        )}
                      </div>
                      {!isCollapsed && item.badge && (
                        <motion.span
                          className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                            isActive(item.path)
                              ? 'bg-white/20 text-white'
                              : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/dashboard/profile"
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                JD
              </motion.div>
              {!isCollapsed && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Collapse trigger on the right edge */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-white border border-gray-200 rounded-r-lg items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
          </svg>
        </motion.button>
      </motion.aside>
    </>
  );
};

export default Sidebar;
