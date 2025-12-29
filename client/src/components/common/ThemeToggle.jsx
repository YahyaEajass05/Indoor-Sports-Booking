import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleClick = () => {
    console.log('=== ThemeToggle Button Clicked ===');
    console.log('Current theme:', theme);
    console.log('Is dark:', isDark);
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
        isDark 
          ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' 
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <>
          <FiSun className="text-xl" />
          {showLabel && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <FiMoon className="text-xl" />
          {showLabel && <span>Dark Mode</span>}
        </>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
