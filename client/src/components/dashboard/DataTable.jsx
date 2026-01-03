import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronUp,
  FiChevronDown,
  FiSearch,
  FiFilter,
  FiDownload,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';

/**
 * DataTable - Advanced data table with sorting, filtering, and pagination
 * Features:
 * - Column sorting (ascending/descending)
 * - Global search functionality
 * - Per-column filtering
 * - Pagination with customizable page size
 * - Row selection with bulk actions
 * - Responsive design with mobile view
 * - Export functionality
 * - Row actions menu
 * - Animated transitions
 */
const DataTable = ({
  data = [],
  columns = [],
  onRowClick,
  onEdit,
  onDelete,
  onView,
  searchable = true,
  filterable = true,
  sortable = true,
  paginated = true,
  selectable = false,
  exportable = true,
  pageSize: initialPageSize = 10,
  emptyMessage = 'No data available',
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [columnFilters, setColumnFilters] = useState({});
  const [activeRowMenu, setActiveRowMenu] = useState(null);

  // Filtering
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Global search
    if (searchQuery) {
      filtered = filtered.filter((row) =>
        columns.some((column) => {
          const value = row[column.key];
          return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
        })
      );
    }

    // Column filters
    Object.entries(columnFilters).forEach(([key, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter((row) =>
          row[key]?.toString().toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    });

    return filtered;
  }, [data, searchQuery, columnFilters, columns]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, paginated]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (!sortable) return;

    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map((_, index) => index)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
  };

  const handleExport = () => {
    const csv = [
      columns.map((col) => col.label).join(','),
      ...sortedData.map((row) => columns.map((col) => row[col.key]).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <FiChevronUp className="w-4 h-4" />
    ) : (
      <FiChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Search */}
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900/50 outline-none transition-all"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {filterable && (
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                  showFilters
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </motion.button>
            )}

            {exportable && (
              <motion.button
                onClick={handleExport}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium text-sm flex items-center gap-2 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="w-4 h-4" />
                Export
              </motion.button>
            )}
          </div>
        </div>

        {/* Column Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-hidden"
            >
              {columns.map((column) => (
                <div key={column.key}>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {column.label}
                  </label>
                  <input
                    type="text"
                    value={columnFilters[column.key] || ''}
                    onChange={(e) => {
                      setColumnFilters({ ...columnFilters, [column.key]: e.target.value });
                      setCurrentPage(1);
                    }}
                    placeholder={`Filter ${column.label}`}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900/50"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              {selectable && (
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider ${
                    column.sortable !== false && sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable !== false && sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider w-24">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <AnimatePresence mode="wait">
              {paginatedData.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0) + ((onEdit || onDelete || onView) ? 1 : 0)}
                    className="px-4 py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
                        <FiSearch className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
                    </div>
                  </td>
                </motion.tr>
              ) : (
                paginatedData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => onRowClick?.(row)}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      onRowClick ? 'cursor-pointer' : ''
                    } ${selectedRows.has(index) ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(index)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectRow(index, e.target.checked);
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                    {(onEdit || onDelete || onView) && (
                      <td className="px-4 py-3 text-center relative">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRowMenu(activeRowMenu === index ? null : index);
                          }}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiMoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </motion.button>

                        <AnimatePresence>
                          {activeRowMenu === index && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                            >
                              {onView && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onView(row);
                                    setActiveRowMenu(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                                >
                                  <FiEye className="w-4 h-4" />
                                  <span className="text-sm">View</span>
                                </button>
                              )}
                              {onEdit && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(row);
                                    setActiveRowMenu(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                                >
                                  <FiEdit className="w-4 h-4" />
                                  <span className="text-sm">Edit</span>
                                </button>
                              )}
                              {onDelete && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(row);
                                    setActiveRowMenu(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                  <span className="text-sm">Delete</span>
                                </button>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Show:</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900/50"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                of {sortedData.length} results
              </span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              <motion.button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronsLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
              <motion.button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>

              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <motion.button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
              <motion.button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronsRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
