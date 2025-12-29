import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiEdit,
  FiTrash2,
  FiNavigation,
  FiPhone,
  FiMail,
  FiAlertCircle,
  FiCheckCircle,
  FiCreditCard,
  FiUser,
  FiSettings,
  FiShare2,
  FiPlus,
  FiZap
} from 'react-icons/fi';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';

const UpcomingBookings = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Mock upcoming bookings
  const upcomingBookings = [
    {
      id: 1,
      bookingId: 'BK-2024-010',
      courtName: 'Premier Basketball Court',
      sport: 'Basketball',
      date: '2024-01-20',
      startTime: '14:00',
      endTime: '16:00',
      location: 'Downtown Sports Complex',
      address: '123 Main Street, Downtown',
      price: 120,
      status: 'confirmed',
      paymentStatus: 'paid',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
      amenities: ['Parking', 'Locker Rooms', 'Cafeteria', 'WiFi'],
      contactName: 'John Manager',
      contactPhone: '+1 (555) 123-4567',
      contactEmail: 'manager@sportscenter.com',
      cancellationPolicy: 'Free cancellation up to 24 hours before booking',
      participants: 10
    },
    {
      id: 2,
      bookingId: 'BK-2024-011',
      courtName: 'Elite Tennis Arena',
      sport: 'Tennis',
      date: '2024-01-22',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Riverside Sports Center',
      address: '456 River Road, Riverside',
      price: 150,
      status: 'pending',
      paymentStatus: 'pending',
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400',
      amenities: ['Parking', 'Pro Shop', 'Coaching Available'],
      contactName: 'Sarah Coach',
      contactPhone: '+1 (555) 987-6543',
      contactEmail: 'info@tennisarena.com',
      cancellationPolicy: 'Free cancellation up to 48 hours before booking',
      participants: 4
    },
    {
      id: 3,
      bookingId: 'BK-2024-012',
      courtName: 'Pro Badminton Hall',
      sport: 'Badminton',
      date: '2024-01-25',
      startTime: '18:00',
      endTime: '20:00',
      location: 'City Sports Hub',
      address: '789 City Center, Downtown',
      price: 90,
      status: 'confirmed',
      paymentStatus: 'paid',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400',
      amenities: ['Parking', 'Equipment Rental', 'Shower Facilities'],
      contactName: 'Mike Admin',
      contactPhone: '+1 (555) 456-7890',
      contactEmail: 'contact@sportshub.com',
      cancellationPolicy: 'Free cancellation up to 12 hours before booking',
      participants: 4
    }
  ];

  // Calculate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newTimeLeft = {};
      
      upcomingBookings.forEach(booking => {
        const bookingDate = new Date(`${booking.date}T${booking.startTime}`);
        const diff = bookingDate - now;
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          newTimeLeft[booking.id] = { days, hours, minutes, seconds };
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    console.log('Cancelling booking:', selectedBooking);
    setShowCancelModal(false);
    setSelectedBooking(null);
    alert(`Booking ${selectedBooking.bookingId} has been cancelled`);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleGetDirections = (booking) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(booking.address)}`, '_blank');
  };

  const handleShareBooking = (booking) => {
    if (navigator.share) {
      navigator.share({
        title: booking.courtName,
        text: `My booking at ${booking.courtName} on ${booking.date}`,
        url: window.location.href
      });
    } else {
      alert('Share feature not supported on this browser');
    }
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  const CountdownBox = ({ value, label }) => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="glass rounded-xl p-3 min-w-[70px]"
    >
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-2xl font-bold text-gray-900"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <div className="text-xs text-gray-600 uppercase">{label}</div>
    </motion.div>
  );

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
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-pink-500/5" />
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

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Upcoming Bookings</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <FiCalendar className="text-primary-500" />
                Your scheduled court reservations
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" icon={FiPlus}>
                New Booking
              </Button>
              <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Grid
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  List
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass p-6 rounded-2xl border border-primary-200/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <FiCalendar className="text-2xl text-primary-600" />
                </div>
                <Badge variant="primary">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Upcoming</p>
              <p className="text-3xl font-bold text-gray-900">{upcomingBookings.length}</p>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass p-6 rounded-2xl border border-green-200/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FiCheckCircle className="text-2xl text-green-600" />
                </div>
                <Badge variant="success">Confirmed</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Confirmed</p>
              <p className="text-3xl font-bold text-gray-900">
                {upcomingBookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass p-6 rounded-2xl border border-orange-200/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FiAlertCircle className="text-2xl text-orange-600" />
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Pending Payment</p>
              <p className="text-3xl font-bold text-gray-900">
                {upcomingBookings.filter(b => b.paymentStatus === 'pending').length}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bookings Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}
        >
          {upcomingBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-2xl border border-gray-200/50 overflow-hidden"
            >
              {/* Booking Image & Status */}
              <div className="relative h-48">
                <img
                  src={booking.image}
                  alt={booking.courtName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={booking.status === 'confirmed' ? 'success' : 'warning'}
                    animated
                  >
                    {booking.status}
                  </Badge>
                </div>

                {/* Booking ID */}
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs opacity-80">Booking ID</p>
                  <p className="font-mono font-semibold">{booking.bookingId}</p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.courtName}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <FiMapPin className="text-primary-500" />
                    <span className="text-sm">{booking.location}</span>
                  </div>
                  <Badge variant="info" size="sm">{booking.sport}</Badge>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FiCalendar className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiClock className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Time</p>
                      <p className="font-semibold text-gray-900">{booking.startTime}</p>
                    </div>
                  </div>
                </div>

                {/* Countdown */}
                {timeLeft[booking.id] && (
                  <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-3 text-center">Starts in</p>
                    <div className="flex gap-2 justify-center">
                      <CountdownBox value={timeLeft[booking.id].days} label="Days" />
                      <CountdownBox value={timeLeft[booking.id].hours} label="Hours" />
                      <CountdownBox value={timeLeft[booking.id].minutes} label="Mins" />
                      <CountdownBox value={timeLeft[booking.id].seconds} label="Secs" />
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between py-3 px-4 bg-green-50 rounded-xl">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">${booking.price}</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={FiEye}
                    onClick={() => handleViewDetails(booking)}
                    fullWidth
                  >
                    Details
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FiNavigation}
                    onClick={() => handleGetDirections(booking)}
                    fullWidth
                  >
                    Directions
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FiShare2}
                    onClick={() => handleShareBooking(booking)}
                    fullWidth
                  >
                    Share
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={FiTrash2}
                    onClick={() => handleCancelBooking(booking)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {upcomingBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-16 rounded-2xl border border-gray-200/50 text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full mb-6">
              <FiCalendar className="text-5xl text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Upcoming Bookings</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You don't have any upcoming bookings. Start by exploring available courts.
            </p>
            <Button variant="primary" icon={FiPlus} size="lg">
              Book a Court
            </Button>
          </motion.div>
        )}

        {/* Cancel Modal */}
        <Modal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          title="Cancel Booking"
        >
          {selectedBooking && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <FiAlertCircle className="text-3xl text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Are you sure you want to cancel?
                </h3>
                <p className="text-gray-600 mb-4">
                  Booking: {selectedBooking.bookingId}
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
                  <p className="text-sm font-semibold text-yellow-800 mb-1">Cancellation Policy:</p>
                  <p className="text-sm text-yellow-700">{selectedBooking.cancellationPolicy}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowCancelModal(false)}
                  fullWidth
                >
                  Keep Booking
                </Button>
                <Button
                  variant="danger"
                  icon={FiTrash2}
                  onClick={confirmCancellation}
                  fullWidth
                >
                  Cancel Booking
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Details Modal */}
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Booking Details"
          size="lg"
        >
          {selectedBooking && (
            <div className="space-y-6">
              {/* Court Info */}
              <div>
                <img
                  src={selectedBooking.image}
                  alt={selectedBooking.courtName}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedBooking.courtName}</h3>
                <Badge variant="info">{selectedBooking.sport}</Badge>
              </div>

              {/* Booking Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                  <p className="font-mono font-semibold text-gray-900">{selectedBooking.bookingId}</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <Badge variant={selectedBooking.status === 'confirmed' ? 'success' : 'warning'}>
                    {selectedBooking.status}
                  </Badge>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedBooking.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Time</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBooking.startTime} - {selectedBooking.endTime}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="glass p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-2xl text-primary-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{selectedBooking.location}</p>
                    <p className="text-sm text-gray-600">{selectedBooking.address}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="glass p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiUser className="text-primary-500" />
                    <span>{selectedBooking.contactName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiPhone className="text-primary-500" />
                    <span>{selectedBooking.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMail className="text-primary-500" />
                    <span>{selectedBooking.contactEmail}</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBooking.amenities.map((amenity, index) => (
                    <Badge key={index} variant="default">{amenity}</Badge>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="glass p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-3xl font-bold text-green-600">${selectedBooking.price}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-green-200">
                  <Badge variant={selectedBooking.paymentStatus === 'paid' ? 'success' : 'warning'}>
                    Payment {selectedBooking.paymentStatus}
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

export default UpcomingBookings;
