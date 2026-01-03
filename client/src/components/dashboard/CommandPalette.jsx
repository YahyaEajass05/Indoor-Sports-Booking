import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiSearch,
  FiCommand,
  FiCalendar,
  FiCreditCard,
  FiUser,
  FiSettings,
  FiHome,
  FiBookmark,
  FiClock,
  FiActivity,
  FiMapPin,
  FiGrid,
  FiTrendingUp,
  FiDollarSign,
  FiGift,
  FiBell,
  FiUsers,
  FiShield,
  FiPieChart,
  FiFileText,
  FiZap,
  FiArrowRight,
  FiCornerDownLeft,
} from 'react-icons/fi';

/**
 * CommandPalette - Advanced command palette for quick navigation and actions
 * Features:
 * - Fuzzy search across all commands
 * - Keyboard navigation (up/down arrows, enter)
 * - Recent commands tracking
 * - Role-based commands
 * - Keyboard shortcuts display
 * - Categories grouping
 */
const CommandPalette = ({ isOpen, onClose, userRole = 'user' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredCommands, setFilteredCommands] = useState([]);
  const [recentCommands, setRecentCommands] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Define all available commands based on role
  const getAllCommands = () => {
    const baseCommands = [
      {
        id: 'home',
        label: 'Go to Home',
        icon: FiHome,
        action: () => navigate('/'),
        keywords: ['home', 'dashboard', 'main'],
        category: 'Navigation',
        shortcut: '⌘H',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        id: 'search-courts',
        label: 'Search Courts',
        icon: FiMapPin,
        action: () => navigate('/courts'),
        keywords: ['search', 'find', 'courts', 'venues'],
        category: 'Courts',
        shortcut: '⌘S',
        color: 'from-green-500 to-emerald-500',
      },
    ];

    const roleCommands = {
      user: [
        {
          id: 'user-dashboard',
          label: 'User Dashboard',
          icon: FiHome,
          action: () => navigate('/dashboard/user'),
          keywords: ['dashboard', 'home', 'overview'],
          category: 'Navigation',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          id: 'book-court',
          label: 'Book a Court',
          icon: FiCalendar,
          action: () => navigate('/courts'),
          keywords: ['book', 'reserve', 'court', 'booking'],
          category: 'Booking',
          shortcut: '⌘B',
          color: 'from-purple-500 to-pink-500',
        },
        {
          id: 'upcoming-bookings',
          label: 'Upcoming Bookings',
          icon: FiClock,
          action: () => navigate('/dashboard/user/upcoming-bookings'),
          keywords: ['upcoming', 'future', 'bookings', 'reservations'],
          category: 'Booking',
          color: 'from-green-500 to-emerald-500',
        },
        {
          id: 'booking-history',
          label: 'Booking History',
          icon: FiActivity,
          action: () => navigate('/dashboard/user/booking-history'),
          keywords: ['history', 'past', 'previous', 'bookings'],
          category: 'Booking',
          color: 'from-orange-500 to-red-500',
        },
        {
          id: 'saved-courts',
          label: 'Saved Courts',
          icon: FiBookmark,
          action: () => navigate('/dashboard/user/saved-courts'),
          keywords: ['saved', 'favorites', 'bookmarks', 'courts'],
          category: 'Courts',
          color: 'from-yellow-500 to-orange-500',
        },
        {
          id: 'payments',
          label: 'Payment History',
          icon: FiCreditCard,
          action: () => navigate('/dashboard/user/payments'),
          keywords: ['payments', 'transactions', 'billing', 'invoices'],
          category: 'Payments',
          color: 'from-indigo-500 to-purple-500',
        },
        {
          id: 'profile',
          label: 'My Profile',
          icon: FiUser,
          action: () => navigate('/dashboard/user/profile'),
          keywords: ['profile', 'account', 'settings', 'personal'],
          category: 'Account',
          color: 'from-teal-500 to-green-500',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: FiBell,
          action: () => navigate('/dashboard/user/notifications'),
          keywords: ['notifications', 'alerts', 'messages'],
          category: 'Account',
          color: 'from-red-500 to-pink-500',
        },
      ],
      owner: [
        {
          id: 'owner-dashboard',
          label: 'Owner Dashboard',
          icon: FiHome,
          action: () => navigate('/dashboard/owner'),
          keywords: ['dashboard', 'home', 'overview'],
          category: 'Navigation',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          id: 'manage-courts',
          label: 'Manage Courts',
          icon: FiGrid,
          action: () => navigate('/dashboard/owner/manage-courts'),
          keywords: ['manage', 'courts', 'venues', 'facilities'],
          category: 'Courts',
          color: 'from-green-500 to-emerald-500',
        },
        {
          id: 'owner-bookings',
          label: 'View Bookings',
          icon: FiCalendar,
          action: () => navigate('/dashboard/owner/bookings'),
          keywords: ['bookings', 'reservations', 'appointments'],
          category: 'Booking',
          color: 'from-purple-500 to-pink-500',
        },
        {
          id: 'court-availability',
          label: 'Court Availability',
          icon: FiClock,
          action: () => navigate('/dashboard/owner/court-availability'),
          keywords: ['availability', 'schedule', 'calendar', 'slots'],
          category: 'Courts',
          color: 'from-orange-500 to-red-500',
        },
        {
          id: 'revenue',
          label: 'Revenue Reports',
          icon: FiTrendingUp,
          action: () => navigate('/dashboard/owner/revenue'),
          keywords: ['revenue', 'earnings', 'income', 'reports'],
          category: 'Finance',
          color: 'from-indigo-500 to-purple-500',
        },
        {
          id: 'payouts',
          label: 'Payouts',
          icon: FiDollarSign,
          action: () => navigate('/dashboard/owner/payouts'),
          keywords: ['payouts', 'withdrawals', 'payments'],
          category: 'Finance',
          color: 'from-green-500 to-teal-500',
        },
        {
          id: 'promotions',
          label: 'Promotions',
          icon: FiGift,
          action: () => navigate('/dashboard/owner/promotions'),
          keywords: ['promotions', 'offers', 'discounts', 'deals'],
          category: 'Marketing',
          color: 'from-yellow-500 to-orange-500',
        },
      ],
      admin: [
        {
          id: 'admin-dashboard',
          label: 'Admin Dashboard',
          icon: FiHome,
          action: () => navigate('/dashboard/admin'),
          keywords: ['dashboard', 'admin', 'overview'],
          category: 'Navigation',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          id: 'manage-users',
          label: 'Manage Users',
          icon: FiUsers,
          action: () => navigate('/dashboard/admin/users'),
          keywords: ['users', 'members', 'accounts', 'manage'],
          category: 'Management',
          color: 'from-purple-500 to-pink-500',
        },
        {
          id: 'manage-owners',
          label: 'Manage Owners',
          icon: FiShield,
          action: () => navigate('/dashboard/admin/owners'),
          keywords: ['owners', 'court owners', 'vendors'],
          category: 'Management',
          color: 'from-green-500 to-emerald-500',
        },
        {
          id: 'manage-courts',
          label: 'Manage Courts',
          icon: FiGrid,
          action: () => navigate('/dashboard/admin/courts'),
          keywords: ['courts', 'venues', 'facilities'],
          category: 'Management',
          color: 'from-orange-500 to-red-500',
        },
        {
          id: 'admin-bookings',
          label: 'All Bookings',
          icon: FiCalendar,
          action: () => navigate('/dashboard/admin/bookings'),
          keywords: ['bookings', 'reservations', 'all'],
          category: 'Management',
          color: 'from-indigo-500 to-purple-500',
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: FiPieChart,
          action: () => navigate('/dashboard/admin/reports'),
          keywords: ['reports', 'analytics', 'statistics'],
          category: 'Analytics',
          color: 'from-teal-500 to-green-500',
        },
        {
          id: 'audit-logs',
          label: 'Audit Logs',
          icon: FiFileText,
          action: () => navigate('/dashboard/admin/audit-logs'),
          keywords: ['audit', 'logs', 'history', 'activity'],
          category: 'Security',
          color: 'from-red-500 to-pink-500',
        },
        {
          id: 'system-settings',
          label: 'System Settings',
          icon: FiSettings,
          action: () => navigate('/dashboard/admin/system-settings'),
          keywords: ['settings', 'configuration', 'system'],
          category: 'Settings',
          color: 'from-gray-500 to-slate-500',
        },
      ],
    };

    return [...baseCommands, ...(roleCommands[userRole] || roleCommands.user)];
  };

  const allCommands = getAllCommands();

  // Fuzzy search function
  const fuzzySearch = (query, commands) => {
    if (!query.trim()) {
      return commands;
    }

    const searchTerms = query.toLowerCase().split(' ');
    
    return commands
      .map((command) => {
        const searchableText = [
          command.label,
          command.category,
          ...(command.keywords || []),
        ]
          .join(' ')
          .toLowerCase();

        let score = 0;
        searchTerms.forEach((term) => {
          if (searchableText.includes(term)) {
            score += 1;
            // Boost score for exact matches in label
            if (command.label.toLowerCase().includes(term)) {
              score += 2;
            }
          }
        });

        return { ...command, score };
      })
      .filter((command) => command.score > 0)
      .sort((a, b) => b.score - a.score);
  };

  // Update filtered commands when search query changes
  useEffect(() => {
    const filtered = fuzzySearch(searchQuery, allCommands);
    setFilteredCommands(filtered);
    setSelectedIndex(0);
  }, [searchQuery, userRole]);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  const executeCommand = (command) => {
    // Add to recent commands
    const recent = [command, ...recentCommands.filter((c) => c.id !== command.id)].slice(0, 5);
    setRecentCommands(recent);
    localStorage.setItem('recentCommands', JSON.stringify(recent));

    // Execute command action
    command.action();
    onClose();
    setSearchQuery('');
  };

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, command) => {
    const category = command.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(command);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-[10%] left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-[101]"
          >
            <div className="mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Search Input */}
              <div className="relative border-b border-gray-200 dark:border-gray-700">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none text-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* Commands List */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {searchQuery.trim() === '' && recentCommands.length > 0 && (
                  <div className="mb-4">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Recent
                    </div>
                    <div className="space-y-1">
                      {recentCommands.map((command, index) => (
                        <CommandItem
                          key={command.id}
                          command={command}
                          isSelected={false}
                          onClick={() => executeCommand(command)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {Object.entries(groupedCommands).map(([category, commands]) => (
                  <div key={category} className="mb-4 last:mb-0">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {category}
                    </div>
                    <div className="space-y-1">
                      {commands.map((command, index) => {
                        const globalIndex = filteredCommands.findIndex((c) => c.id === command.id);
                        return (
                          <CommandItem
                            key={command.id}
                            command={command}
                            isSelected={globalIndex === selectedIndex}
                            onClick={() => executeCommand(command)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}

                {filteredCommands.length === 0 && searchQuery.trim() !== '' && (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <FiSearch className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">No commands found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Try searching with different keywords
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
                        ↑↓
                      </kbd>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
                        ↵
                      </kbd>
                      <span>Select</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCommand className="w-3 h-3" />
                    <span>Command Palette</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Command Item Component
const CommandItem = ({ command, isSelected, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
        isSelected
          ? 'bg-gradient-to-r ' + command.color + ' text-white shadow-lg scale-[1.02]'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
      }`}
      whileHover={{ x: 5 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          isSelected ? 'bg-white/20' : 'bg-gradient-to-br ' + command.color
        }`}
      >
        <command.icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white'}`} />
      </div>
      <div className="flex-1 text-left">
        <div className="font-medium text-sm">{command.label}</div>
        {command.keywords && command.keywords.length > 0 && (
          <div className="text-xs opacity-70 mt-0.5">
            {command.keywords.slice(0, 3).join(', ')}
          </div>
        )}
      </div>
      {command.shortcut && (
        <kbd
          className={`px-2 py-1 text-xs font-semibold rounded ${
            isSelected
              ? 'bg-white/20 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          {command.shortcut}
        </kbd>
      )}
      {isSelected && <FiCornerDownLeft className="w-4 h-4" />}
    </motion.button>
  );
};

export default CommandPalette;
