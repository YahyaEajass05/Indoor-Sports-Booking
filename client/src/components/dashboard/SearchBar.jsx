import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiTrendingUp, FiCommand } from 'react-icons/fi';

/**
 * SearchBar - Advanced search bar with suggestions and recent searches
 * Features:
 * - Real-time search suggestions
 * - Recent searches with local storage
 * - Keyboard navigation
 * - Categories/filters
 * - Voice search support (optional)
 * - Loading states
 */
const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  suggestions = [],
  recentSearches: externalRecentSearches,
  categories = [],
  maxRecentSearches = 5,
  showRecentSearches = true,
  showTrending = true,
  autoFocus = false,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    if (showRecentSearches && !externalRecentSearches) {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } else if (externalRecentSearches) {
      setRecentSearches(externalRecentSearches);
    }
  }, [externalRecentSearches, showRecentSearches]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFocused) return;

      const allItems = [
        ...recentSearches,
        ...suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())),
      ];

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allItems.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && allItems[selectedIndex]) {
            handleSearch(allItems[selectedIndex]);
          } else if (query.trim()) {
            handleSearch(query);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsFocused(false);
          inputRef.current?.blur();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, query, selectedIndex, recentSearches, suggestions]);

  const handleSearch = async (searchQuery) => {
    const trimmedQuery = typeof searchQuery === 'string' ? searchQuery.trim() : query.trim();
    if (!trimmedQuery) return;

    setIsLoading(true);

    // Add to recent searches
    if (showRecentSearches) {
      const updated = [
        trimmedQuery,
        ...recentSearches.filter((s) => s !== trimmedQuery),
      ].slice(0, maxRecentSearches);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }

    // Execute search
    if (onSearch) {
      await onSearch(trimmedQuery);
    }

    setIsLoading(false);
    setIsFocused(false);
    setQuery(trimmedQuery);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const trendingSearches = ['Basketball Courts', 'Tennis Courts', 'Badminton', 'Near Me'];

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <motion.div
          animate={{ scale: isFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative flex items-center">
            <FiSearch className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(-1);
              }}
              onFocus={() => setIsFocused(true)}
              placeholder={placeholder}
              className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 transition-all duration-200 outline-none ${
                isFocused
                  ? 'border-primary-500 dark:border-primary-400 ring-4 ring-primary-100 dark:ring-primary-900/50 bg-white dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
              } text-gray-900 dark:text-gray-100 placeholder-gray-400`}
            />

            {/* Clear/Loading Button */}
            <div className="absolute right-3">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full"
                  />
                ) : query ? (
                  <motion.button
                    key="clear"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleClear}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX className="w-4 h-4 text-gray-500" />
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Keyboard Shortcut Hint */}
        {!isFocused && (
          <div className="absolute right-14 top-1/2 transform -translate-y-1/2 hidden md:flex items-center gap-1">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded border border-gray-300 dark:border-gray-600">
              <FiCommand className="w-3 h-3 inline" /> K
            </kbd>
          </div>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {/* Categories */}
            {categories.length > 0 && (
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 flex-wrap">
                  {categories.map((category, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setQuery(category);
                        handleSearch(category);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {showRecentSearches && recentSearches.length > 0 && !query && (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    <FiClock className="w-3 h-3" />
                    Recent Searches
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      selectedIndex === index
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <FiClock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm flex-1">{search}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {query && filteredSuggestions.length > 0 && (
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Suggestions
                </div>
                {filteredSuggestions.map((suggestion, index) => {
                  const globalIndex = recentSearches.length + index;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        selectedIndex === globalIndex
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <FiSearch className="w-4 h-4 text-gray-400" />
                      <span className="text-sm flex-1">{suggestion}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Trending */}
            {showTrending && !query && recentSearches.length === 0 && (
              <div className="p-2">
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  <FiTrendingUp className="w-3 h-3" />
                  Trending Searches
                </div>
                {trendingSearches.map((trending, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSearch(trending)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm flex-1">{trending}</span>
                    <FiTrendingUp className="w-4 h-4 text-primary-500" />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Empty State */}
            {query && filteredSuggestions.length === 0 && (
              <div className="p-8 text-center">
                <FiSearch className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No suggestions found for "{query}"
                </p>
                <motion.button
                  onClick={() => handleSearch(query)}
                  className="mt-3 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search anyway
                </motion.button>
              </div>
            )}

            {/* Footer Hint */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
                      ↑↓
                    </kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
                      ↵
                    </kbd>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">
                      ESC
                    </kbd>
                    <span>Close</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
