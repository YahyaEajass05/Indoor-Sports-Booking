import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiCheck, FiCalendar, FiDollarSign, FiChevronDown } from 'react-icons/fi';

/**
 * FilterPanel - Advanced filter panel with multiple filter types
 * Features:
 * - Multi-select filters
 * - Date range picker
 * - Price range slider
 * - Tag filters
 * - Active filter chips
 * - Reset functionality
 */
const FilterPanel = ({
  filters = [],
  activeFilters = {},
  onFilterChange,
  onReset,
  orientation = 'vertical',
  className = '',
}) => {
  const [expandedSections, setExpandedSections] = useState(
    filters.reduce((acc, filter) => ({ ...acc, [filter.id]: true }), {})
  );

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFilterChange = (filterId, value, isMulti = false) => {
    if (isMulti) {
      const currentValues = activeFilters[filterId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      onFilterChange({ ...activeFilters, [filterId]: newValues });
    } else {
      onFilterChange({ ...activeFilters, [filterId]: value });
    }
  };

  const removeFilter = (filterId, value = null) => {
    if (value !== null) {
      const currentValues = activeFilters[filterId] || [];
      onFilterChange({
        ...activeFilters,
        [filterId]: currentValues.filter((v) => v !== value),
      });
    } else {
      const newFilters = { ...activeFilters };
      delete newFilters[filterId];
      onFilterChange(newFilters);
    }
  };

  const activeFilterCount = Object.keys(activeFilters).reduce((count, key) => {
    const value = activeFilters[key];
    if (Array.isArray(value)) return count + value.length;
    if (value) return count + 1;
    return count;
  }, 0);

  const renderFilter = (filter) => {
    switch (filter.type) {
      case 'checkbox':
        return (
          <div className="space-y-2">
            {filter.options.map((option) => {
              const isChecked = (activeFilters[filter.id] || []).includes(option.value);
              return (
                <motion.label
                  key={option.value}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleFilterChange(filter.id, option.value, true)}
                      className="peer sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all ${
                      isChecked
                        ? 'bg-gradient-to-br from-primary-500 to-secondary-500 border-primary-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {isChecked && <FiCheck className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                    {option.label}
                  </span>
                  {option.count && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                      {option.count}
                    </span>
                  )}
                </motion.label>
              );
            })}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {filter.options.map((option) => {
              const isSelected = activeFilters[filter.id] === option.value;
              return (
                <motion.label
                  key={option.value}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="relative">
                    <input
                      type="radio"
                      name={filter.id}
                      checked={isSelected}
                      onChange={() => handleFilterChange(filter.id, option.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                </motion.label>
              );
            })}
          </div>
        );

      case 'range':
        const rangeValue = activeFilters[filter.id] || [filter.min, filter.max];
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {filter.prefix}{rangeValue[0]}{filter.suffix}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {filter.prefix}{rangeValue[1]}{filter.suffix}
              </span>
            </div>
            <input
              type="range"
              min={filter.min}
              max={filter.max}
              value={rangeValue[1]}
              onChange={(e) =>
                handleFilterChange(filter.id, [rangeValue[0], parseInt(e.target.value)])
              }
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
          </div>
        );

      case 'date':
        return (
          <div className="space-y-2">
            <input
              type="date"
              value={activeFilters[filter.id]?.start || ''}
              onChange={(e) =>
                handleFilterChange(filter.id, {
                  ...activeFilters[filter.id],
                  start: e.target.value,
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900/50"
            />
            <input
              type="date"
              value={activeFilters[filter.id]?.end || ''}
              onChange={(e) =>
                handleFilterChange(filter.id, {
                  ...activeFilters[filter.id],
                  end: e.target.value,
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900/50"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiFilter className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
            {activeFilterCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full"
              >
                {activeFilterCount}
              </motion.span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <motion.button
              onClick={onReset}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset All
            </motion.button>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([filterId, value]) => {
              const filter = filters.find((f) => f.id === filterId);
              if (!filter) return null;

              if (Array.isArray(value)) {
                return value.map((v) => (
                  <motion.div
                    key={`${filterId}-${v}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg text-sm"
                  >
                    <span className="font-medium">{v}</span>
                    <button
                      onClick={() => removeFilter(filterId, v)}
                      className="hover:bg-primary-100 dark:hover:bg-primary-900/40 rounded-full p-0.5 transition-colors"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </motion.div>
                ));
              }

              return (
                <motion.div
                  key={filterId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg text-sm"
                >
                  <span className="font-medium">{filter.label}: {value.toString()}</span>
                  <button
                    onClick={() => removeFilter(filterId)}
                    className="hover:bg-primary-100 dark:hover:bg-primary-900/40 rounded-full p-0.5 transition-colors"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="p-4 space-y-4">
        {filters.map((filter, index) => (
          <motion.div
            key={filter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
          >
            <button
              onClick={() => toggleSection(filter.id)}
              className="w-full flex items-center justify-between mb-3 group"
            >
              <div className="flex items-center gap-2">
                {filter.icon && <filter.icon className="w-4 h-4 text-gray-500" />}
                <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  {filter.label}
                </span>
              </div>
              <motion.div
                animate={{ rotate: expandedSections[filter.id] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedSections[filter.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {renderFilter(filter)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
