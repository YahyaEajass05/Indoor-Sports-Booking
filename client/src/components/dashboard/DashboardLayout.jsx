import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import CommandPalette from './CommandPalette';
import { FiCommand } from 'react-icons/fi';

/**
 * DashboardLayout - Advanced dashboard layout with sidebar, header, and main content
 * Features:
 * - Responsive design with mobile support
 * - Collapsible sidebar with smooth animations
 * - Command palette for quick navigation
 * - Scroll-based animations and effects
 * - Breadcrumb navigation
 * - Theme support
 */
const DashboardLayout = ({ userRole = 'user', user = null, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const mainContentRef = useRef(null);
  const { scrollY } = useScroll();

  // Transform scroll position to create parallax effects
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);

  // Handle scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      // Cmd+B or Ctrl+B to toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarCollapsed(!isSidebarCollapsed);
      }
      // Escape to close command palette
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarCollapsed]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsSidebarOpen(true);
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  }, [isMobileMenuOpen, isSidebarCollapsed]);

  // Calculate main content margin based on sidebar state
  const getMainContentMargin = () => {
    if (window.innerWidth < 1024) return '0';
    if (isSidebarCollapsed) return '80px';
    return '280px';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Animated Background Pattern */}
      <motion.div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_50%)]" />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            userRole={userRole}
          />
        )}
      </AnimatePresence>

      {/* Dashboard Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggle={toggleSidebar}
        onClose={() => setIsMobileMenuOpen(false)}
        userRole={userRole}
        user={user}
      />

      {/* Main Content Area */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          marginLeft: getMainContentMargin(),
        }}
      >
        {/* Dashboard Header */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="sticky top-0 z-40"
        >
          <DashboardHeader
            onMenuToggle={toggleSidebar}
            onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)}
            user={user}
            isSidebarCollapsed={isSidebarCollapsed}
          />
        </motion.div>

        {/* Main Content with Animations */}
        <motion.main
          ref={mainContentRef}
          className="p-4 md:p-6 lg:p-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {children || <Outlet />}
            </motion.div>
          </AnimatePresence>

          {/* Command Palette Hint */}
          <motion.div
            className="fixed bottom-6 right-6 z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="group flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiCommand className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                Quick Actions
              </span>
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded">
                ⌘K
              </kbd>
            </motion.button>
          </motion.div>

          {/* Scroll to Top Button */}
          <AnimatePresence>
            {lastScrollY > 500 && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 left-6 z-30 p-3 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Floating Particles Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
