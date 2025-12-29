import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiXCircle,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiRefreshCw,
  FiAlertCircle,
  FiFilter,
  FiSearch,
  FiInfo,
  FiTrendingDown,
  FiBarChart2,
  FiDownload,
  FiEye
} from 'react-icons/fi';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';

const CancelledBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reasonFilter, setReasonFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock cancelled bookings data
  const cancelledBookings = [
    {
      id: 1,
      bookingId: 'BK-2024-005',
      courtName: 'Premier Basketball Court',
      sport: 'Basketball',
      location: 'Downtown Sports Complex',
      date: '2024-01-10',
      startTime: '14:00',
      endTime: '16:00',
      amount: 120,
      cancelledDate: '2024-01-08',
      cancelledBy: 'user',
      reason: 'schedule_conflict',
      refundStatus: 'processed',
      refundAmount: 120,
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'
    },
    {
      id: 2,
      bookingId: 'BK-2024-004',
      courtName: 'Elite Tennis Arena',
      sport: 'Tennis',
      location: 'Riverside Sports Center',
      date: '2024-01-05',
      startTime: '10:00',
      endTime: '12:00',
      amount: 150,
      cancelledDate: '2024-01-04',
      cancelledBy: 'venue',
      reason: 'maintenance',
      refundStatus: 'processed',
      refundAmount: 150,
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400'
    },
    {
      id: 3,
      bookingId: 'BK-2023-099',
      courtName: 'Pro Badminton Hall',
      sport: 'Badminton',
      location: 'City Sports Hub',
      date: '2023-12-28',
      startTime: '18:00',
      endTime: '20:00',
      amount: 90,
      cancelledDate: '2023-12-27',
      cancelledBy: 'user',
      reason: 'personal',
      refundStatus: 'partial',
      refundAmount: 45,
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400'
    },
    {
      id: 4,
      bookingId: 'BK-2023-098',
      courtName: 'Indoor Soccer Arena',
      sport: 'Football',
      location: 'Westside Complex',
      date: '2023-12-20',
      startTime: '16:00',
      endTime: '18:00',
      amount: 200,
      cancelledDate: '2023-12-19',
      cancelledBy: 'user',
      reason: 'weather',
      refundStatus: 'processed',
      refundAmount: 200,
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400'
    }
  ];

  const reasonLabels = {
    schedule_conflict: 'Schedule Conflict',
    personal: 'Personal Reasons',
    weather: 'Weather Conditions',
    maintenance: 'Venue Maintenance',
    emergency: 'Emergency',
    other: 'Other'
  };

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    let filtered = [...cancelledBookings];

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.courtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (reasonFilter !== 'all') {
      filtered = filtered.filter(booking => booking.reason === reasonFilter);
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(booking => {
        const cancelDate = new Date(booking.cancelledDate);
        if (dateFilter === 'week') {
          return (now - cancelDate) / (1000 * 60 * 60 * 24) <= 7;
        } else if (dateFilter === 'month') {
          return (now - cancelDate) / (1000 * 60 * 60 * 24) <= 30;
        }
        return true;
      });
    }

    return filtered;
  }, [searchTerm, reasonFilter, dateFilter, cancelledBookings]);

  // Statistics
  const stats = useMemo(() => {
    const total = cancelledBookings.length;
    const totalRefunded = cancelledBookings.reduce((sum, b) => sum + b.refundAmount, 0);
    const byUser = cancelledBookings.filter(b => b.cancelledBy === 'user').length;
    const byVenue = cancelledBookings.filter(b => b.cancelledBy === 'venue').length;

    return { total, totalRefunded, byUser, byVenue };
  }, [cancelledBookings]);

  const getRefundBadgeVariant = (status) => {
    return status === 'processed' ? 'success' : status === 'partial' ? 'warning' : 'error';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl border border-gray-200/50 p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold gradient-text mb-2">Cancelled Bookings</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <FiXCircle className="text-red-500" />
              View your cancelled court reservations and refund status
            </p>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass p-6 rounded-2xl border border-red-200/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FiXCircle className="text-2xl text-red-600" />
              </div>
              <FiTrendingDown className="text-red-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Cancelled</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass p-6 rounded-2xl border border-green-200/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiDollarSign className="text-2xl text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Refunded</p>
            <p className="text-3xl font-bold text-gray-900">${stats.totalRefunded}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass p-6 rounded-2xl border border-blue-200/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiAlertCircle className="text-2xl text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Cancelled by Me</p>
            <p className="text-3xl font-bold text-gray-900">{stats.byUser}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass p-6 rounded-2xl border border-orange-200/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FiInfo className="text-2xl text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">By Venue</p>
            <p className="text-3xl font-bold text-gray-900">{stats.byVenue}</p>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-2xl border border-gray-200/50"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by court, location, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={reasonFilter}
              onChange={(e) => setReasonFilter(e.target.value)}
              className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Reasons</option>
              {Object.entries(reasonLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </motion.div>

        {/* Bookings List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 5 }}
              className="glass rounded-2xl border border-gray-200/50 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                  <img
                    src={booking.image}
                    alt={booking.courtName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="error" animated>
                      <FiXCircle /> Cancelled
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.courtName}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMapPin className="text-primary-500" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <FiCalendar className="text-blue-500" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <FiClock className="text-purple-500" />
                            {booking.startTime} - {booking.endTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="info" size="sm">{booking.sport}</Badge>
                        <Badge variant="default" size="sm">
                          {reasonLabels[booking.reason]}
                        </Badge>
                        <Badge
                          variant={getRefundBadgeVariant(booking.refundStatus)}
                          size="sm"
                        >
                          Refund: ${booking.refundAmount}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Original Amount</p>
                        <p className="text-2xl font-bold text-gray-900">${booking.amount}</p>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={FiEye}
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowDetailsModal(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-16 rounded-2xl border border-gray-200/50 text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6">
              <FiXCircle className="text-5xl text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Cancelled Bookings</h3>
            <p className="text-gray-600">
              {searchTerm || reasonFilter !== 'all' || dateFilter !== 'all'
                ? 'No bookings match your filters'
                : 'You have no cancelled bookings'}
            </p>
          </motion.div>
        )}

        {/* Details Modal */}
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Cancellation Details"
          size="lg"
        >
          {selectedBooking && (
            <div className="space-y-6">
              <div className="glass p-4 rounded-xl bg-red-50">
                <div className="flex items-center gap-3 mb-3">
                  <FiXCircle className="text-2xl text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Booking Cancelled</p>
                    <p className="text-sm text-gray-600">
                      Cancelled on {new Date(selectedBooking.cancelledDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                  <p className="font-mono font-semibold">{selectedBooking.bookingId}</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Cancelled By</p>
                  <p className="font-semibold capitalize">{selectedBooking.cancelledBy}</p>
                </div>
              </div>

              <div className="glass p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Cancellation Reason</p>
                <p className="font-semibold text-gray-900">{reasonLabels[selectedBooking.reason]}</p>
              </div>

              <div className="glass p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Refund Amount</p>
                    <p className="text-2xl font-bold text-green-600">${selectedBooking.refundAmount}</p>
                  </div>
                  <Badge variant={getRefundBadgeVariant(selectedBooking.refundStatus)}>
                    {selectedBooking.refundStatus}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </motion.div>
  );
};

export default CancelledBookings;
