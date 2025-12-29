import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, 
  FiMapPin, 
  FiClock, 
  FiDollarSign, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle,
  FiDownload,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiRefreshCw,
  FiTrendingUp,
  FiActivity
} from 'react-icons/fi';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

const BookingHistoryTable = ({ bookings = [], onViewDetails, onDownloadReceipt }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 8;

  // Advanced filtering and sorting
  const filteredAndSortedBookings = useMemo(() => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.courtName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Date filter
    const now = new Date();
    if (dateFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(booking => new Date(booking.date) >= weekAgo);
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(booking => new Date(booking.date) >= monthAgo);
    } else if (dateFilter === 'year') {
      const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(booking => new Date(booking.date) >= yearAgo);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      } else if (sortConfig.key === 'amount') {
        aValue = parseFloat(a.amount);
        bValue = parseFloat(b.amount);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [bookings, searchTerm, statusFilter, dateFilter, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBookings.length / itemsPerPage);
  const paginatedBookings = filteredAndSortedBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = useMemo(() => {
    const total = bookings.length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const totalSpent = bookings.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

    return { total, completed, cancelled, totalSpent };
  }, [bookings]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      pending: 'warning',
      cancelled: 'error',
      confirmed: 'info'
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: FiCheckCircle,
      pending: FiAlertCircle,
      cancelled: FiXCircle,
      confirmed: FiCheckCircle
    };
    return icons[status] || FiAlertCircle;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.2 }
    }
  };

  const statCardVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
      {/* Statistics Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={statCardVariants}
          whileHover="hover"
          className="glass p-6 rounded-2xl border border-primary-200/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <FiActivity className="text-primary-500 text-2xl" />
              <span className="text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-1 rounded-full">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</h3>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </div>
        </motion.div>

        <motion.div
          variants={statCardVariants}
          whileHover="hover"
          className="glass p-6 rounded-2xl border border-green-200/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <FiCheckCircle className="text-green-500 text-2xl" />
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Success</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.completed}</h3>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </motion.div>

        <motion.div
          variants={statCardVariants}
          whileHover="hover"
          className="glass p-6 rounded-2xl border border-red-200/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400/20 to-transparent rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <FiXCircle className="text-red-500 text-2xl" />
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">Cancelled</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.cancelled}</h3>
            <p className="text-sm text-gray-600">Cancelled</p>
          </div>
        </motion.div>

        <motion.div
          variants={statCardVariants}
          whileHover="hover"
          className="glass p-6 rounded-2xl border border-purple-200/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <FiTrendingUp className="text-purple-500 text-2xl" />
              <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Revenue</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">${stats.totalSpent.toFixed(2)}</h3>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-2xl border border-gray-200/50"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full lg:w-auto">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by court, location, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="confirmed">Confirmed</option>
              </select>
            </div>

            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <FiRefreshCw className={isRefreshing ? 'animate-spin' : ''} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-2xl border border-gray-200/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-50 to-purple-50 border-b border-gray-200">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-primary-100 transition-colors"
                  onClick={() => handleSort('bookingId')}
                >
                  <div className="flex items-center gap-2">
                    Booking ID
                    {sortConfig.key === 'bookingId' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-primary-100 transition-colors"
                  onClick={() => handleSort('courtName')}
                >
                  Court Details
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-primary-100 transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-2">
                    Date & Time
                    {sortConfig.key === 'date' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-primary-100 transition-colors"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-2">
                    Amount
                    {sortConfig.key === 'amount' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="popLayout">
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-gray-200"
              >
                {paginatedBookings.map((booking, index) => {
                  const StatusIcon = getStatusIcon(booking.status);
                  return (
                    <motion.tr
                      key={booking.bookingId || index}
                      variants={itemVariants}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`transition-all duration-300 ${
                        hoveredRow === index 
                          ? 'bg-gradient-to-r from-primary-50/50 to-purple-50/50 shadow-lg scale-[1.01]' 
                          : 'hover:bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                          <span className="font-mono text-sm font-semibold text-gray-900">
                            {booking.bookingId}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{booking.courtName}</span>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                            <FiMapPin className="text-primary-500" />
                            {booking.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-gray-900">
                            <FiCalendar className="text-primary-500" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiClock className="text-purple-500" />
                            {booking.startTime} - {booking.endTime}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-semibold text-gray-900">
                          <FiDollarSign className="text-green-500" />
                          {parseFloat(booking.amount).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Badge 
                            variant={getStatusColor(booking.status)}
                            icon={StatusIcon}
                            className="inline-flex"
                          >
                            {booking.status}
                          </Badge>
                        </motion.div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onViewDetails?.(booking)}
                            className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FiEye />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onDownloadReceipt?.(booking)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title="Download Receipt"
                          >
                            <FiDownload />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Empty State */}
        {paginatedBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full mb-4">
              <FiAlertCircle className="text-4xl text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-semibold text-gray-900">
                  {Math.min(currentPage * itemsPerPage, filteredAndSortedBookings.length)}
                </span>{' '}
                of <span className="font-semibold text-gray-900">{filteredAndSortedBookings.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50 hover:border-primary-300 transition-all"
                >
                  <FiChevronLeft />
                </motion.button>
                
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300'
                      }`}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50 hover:border-primary-300 transition-all"
                >
                  <FiChevronRight />
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookingHistoryTable;
