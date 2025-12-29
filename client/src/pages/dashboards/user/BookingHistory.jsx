import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiDownload,
  FiEye,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiTrendingUp,
  FiActivity,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiBarChart2,
  FiPieChart,
  FiFileText
} from 'react-icons/fi';
import BookingHistoryTable from '../../../components/user/BookingHistoryTable';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';

const BookingHistory = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table', 'card', 'timeline'
  const [dateRange, setDateRange] = useState('all');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Mock data - replace with API calls
  const mockBookings = [
    {
      bookingId: 'BK-2024-001',
      courtName: 'Premier Basketball Court',
      location: 'Downtown Sports Complex',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '16:00',
      amount: '120.00',
      status: 'completed',
      sport: 'Basketball',
      paymentMethod: 'Visa ****4532',
      duration: 2
    },
    {
      bookingId: 'BK-2024-002',
      courtName: 'Elite Tennis Arena',
      location: 'Riverside Sports Center',
      date: '2024-01-12',
      startTime: '10:00',
      endTime: '12:00',
      amount: '150.00',
      status: 'completed',
      sport: 'Tennis',
      paymentMethod: 'Mastercard ****8765',
      duration: 2
    },
    {
      bookingId: 'BK-2024-003',
      courtName: 'Pro Badminton Hall',
      location: 'City Sports Hub',
      date: '2024-01-08',
      startTime: '18:00',
      endTime: '20:00',
      amount: '90.00',
      status: 'completed',
      sport: 'Badminton',
      paymentMethod: 'Visa ****4532',
      duration: 2
    },
    {
      bookingId: 'BK-2024-004',
      courtName: 'Indoor Soccer Arena',
      location: 'Westside Complex',
      date: '2024-01-05',
      startTime: '16:00',
      endTime: '18:00',
      amount: '200.00',
      status: 'completed',
      sport: 'Football',
      paymentMethod: 'Amex ****1234',
      duration: 2
    },
    {
      bookingId: 'BK-2023-099',
      courtName: 'Volleyball Center',
      location: 'Eastside Athletic Club',
      date: '2023-12-28',
      startTime: '09:00',
      endTime: '11:00',
      amount: '110.00',
      status: 'completed',
      sport: 'Volleyball',
      paymentMethod: 'Visa ****4532',
      duration: 2
    },
    {
      bookingId: 'BK-2023-098',
      courtName: 'Tennis Court Pro',
      location: 'North Sports Arena',
      date: '2023-12-20',
      startTime: '15:00',
      endTime: '17:00',
      amount: '140.00',
      status: 'completed',
      sport: 'Tennis',
      paymentMethod: 'Mastercard ****8765',
      duration: 2
    }
  ];

  // Analytics calculations
  const analytics = useMemo(() => {
    const total = mockBookings.length;
    const totalSpent = mockBookings.reduce((sum, b) => sum + parseFloat(b.amount), 0);
    const avgBookingCost = totalSpent / total;
    const totalHours = mockBookings.reduce((sum, b) => sum + b.duration, 0);
    
    const sportBreakdown = mockBookings.reduce((acc, b) => {
      acc[b.sport] = (acc[b.sport] || 0) + 1;
      return acc;
    }, {});

    const monthlySpending = mockBookings.reduce((acc, b) => {
      const month = new Date(b.date).toLocaleDateString('en-US', { month: 'short' });
      acc[month] = (acc[month] || 0) + parseFloat(b.amount);
      return acc;
    }, {});

    const favoriteVenue = mockBookings.reduce((acc, b) => {
      acc[b.location] = (acc[b.location] || 0) + 1;
      return acc;
    }, {});
    const mostVisited = Object.keys(favoriteVenue).reduce((a, b) => 
      favoriteVenue[a] > favoriteVenue[b] ? a : b
    );

    return {
      total,
      totalSpent,
      avgBookingCost,
      totalHours,
      sportBreakdown,
      monthlySpending,
      mostVisited
    };
  }, [mockBookings]);

  const handleViewDetails = (booking) => {
    console.log('View details:', booking);
  };

  const handleDownloadReceipt = (booking) => {
    console.log('Download receipt:', booking);
  };

  const exportData = (format) => {
    console.log('Exporting data as', format);
    alert(`Exporting booking history as ${format.toUpperCase()}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl border border-gray-200/50 p-8 relative overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">Booking History</h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <FiFileText className="text-primary-500" />
                  Complete record of all your court bookings
                </p>
              </div>

              {/* Export Options */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                    showAnalytics
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <FiBarChart2 />
                  {showAnalytics ? 'Hide' : 'Show'} Analytics
                </motion.button>

                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <FiDownload />
                    Export
                  </motion.button>
                  
                  {/* Export Dropdown */}
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 min-w-[160px]">
                    <button
                      onClick={() => exportData('pdf')}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                    >
                      <FiFileText className="text-red-500" />
                      Export as PDF
                    </button>
                    <button
                      onClick={() => exportData('csv')}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                    >
                      <FiFileText className="text-green-500" />
                      Export as CSV
                    </button>
                    <button
                      onClick={() => exportData('excel')}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                    >
                      <FiFileText className="text-blue-500" />
                      Export as Excel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analytics Section */}
        <AnimatePresence>
          {showAnalytics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Summary Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-6 rounded-2xl border border-blue-200/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FiActivity className="text-2xl text-blue-600" />
                      </div>
                      <FiTrendingUp className="text-green-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{analytics.total}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-6 rounded-2xl border border-green-200/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <FiDollarSign className="text-2xl text-green-600" />
                      </div>
                      <FiTrendingUp className="text-green-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                    <p className="text-3xl font-bold text-gray-900">${analytics.totalSpent.toFixed(2)}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-6 rounded-2xl border border-purple-200/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <FiClock className="text-2xl text-purple-600" />
                      </div>
                      <FiTrendingUp className="text-green-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Total Hours</p>
                    <p className="text-3xl font-bold text-gray-900">{analytics.totalHours}h</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-6 rounded-2xl border border-orange-200/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <FiBarChart2 className="text-2xl text-orange-600" />
                      </div>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">AVG</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Avg. Cost</p>
                    <p className="text-3xl font-bold text-gray-900">${analytics.avgBookingCost.toFixed(2)}</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sport Breakdown */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass rounded-2xl border border-gray-200/50 p-6"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <FiPieChart className="text-2xl text-primary-500" />
                    <h3 className="text-xl font-bold text-gray-900">Sport Breakdown</h3>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(analytics.sportBreakdown).map(([sport, count], index) => {
                      const percentage = (count / analytics.total) * 100;
                      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
                      return (
                        <div key={sport}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">{sport}</span>
                            <span className="text-sm text-gray-600">{count} bookings ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-full ${colors[index % colors.length]} rounded-full`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Monthly Spending */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass rounded-2xl border border-gray-200/50 p-6"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <FiBarChart2 className="text-2xl text-green-500" />
                    <h3 className="text-xl font-bold text-gray-900">Monthly Spending</h3>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(analytics.monthlySpending).map(([month, amount], index) => {
                      const maxAmount = Math.max(...Object.values(analytics.monthlySpending));
                      const percentage = (amount / maxAmount) * 100;
                      return (
                        <div key={month}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">{month}</span>
                            <span className="text-sm font-bold text-green-600">${amount.toFixed(2)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Favorite Venue */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl border border-primary-200/50 p-6 bg-gradient-to-r from-primary-50/50 to-purple-50/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <FiMapPin className="text-3xl text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Most Visited Venue</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.mostVisited}</p>
                    </div>
                  </div>
                  <Badge variant="primary" size="lg">⭐ Favorite</Badge>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - Booking History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BookingHistoryTable
            bookings={mockBookings}
            onViewDetails={handleViewDetails}
            onDownloadReceipt={handleDownloadReceipt}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookingHistory;
