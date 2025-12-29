import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiAward,
  FiHeart,
  FiMapPin,
  FiStar,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiZap,
  FiTarget,
  FiGift,
  FiBell,
  FiSettings,
  FiUser,
  FiCreditCard
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';

const UserDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('overview');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Booking Confirmed', message: 'Your court booking for tomorrow is confirmed', time: '2 hours ago', type: 'success', unread: true },
    { id: 2, title: 'Special Offer', message: '20% off on weekend bookings', time: '5 hours ago', type: 'info', unread: true },
    { id: 3, title: 'Payment Reminder', message: 'Your payment method expires soon', time: '1 day ago', type: 'warning', unread: false }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - in real app, this would come from API/context
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    avatar: null,
    memberSince: '2023',
    loyaltyPoints: 1250,
    tier: 'Gold'
  };

  const stats = [
    {
      icon: FiActivity,
      label: 'Total Bookings',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: FiCalendar,
      label: 'Upcoming',
      value: '3',
      change: '+2',
      changeType: 'positive',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: FiDollarSign,
      label: 'Total Spent',
      value: '$2,450',
      change: '-8%',
      changeType: 'negative',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: FiAward,
      label: 'Loyalty Points',
      value: userData.loyaltyPoints,
      change: '+180',
      changeType: 'positive',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  const upcomingBookings = [
    {
      id: 1,
      courtName: 'Premier Basketball Court',
      sport: 'Basketball',
      date: '2024-01-15',
      time: '14:00 - 16:00',
      location: 'Downtown Sports Complex',
      price: 120,
      status: 'confirmed',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      id: 2,
      courtName: 'Elite Tennis Arena',
      sport: 'Tennis',
      date: '2024-01-18',
      time: '10:00 - 12:00',
      location: 'Riverside Sports Center',
      price: 150,
      status: 'pending',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      id: 3,
      courtName: 'Pro Badminton Hall',
      sport: 'Badminton',
      date: '2024-01-20',
      time: '18:00 - 20:00',
      location: 'City Sports Hub',
      price: 90,
      status: 'confirmed',
      image: 'https://via.placeholder.com/400x300'
    }
  ];

  const savedCourts = [
    { id: 1, name: 'Premier Basketball Court', sport: 'Basketball', rating: 4.8, image: 'https://via.placeholder.com/300x200' },
    { id: 2, name: 'Elite Tennis Arena', sport: 'Tennis', rating: 4.9, image: 'https://via.placeholder.com/300x200' },
    { id: 3, name: 'Pro Badminton Hall', sport: 'Badminton', rating: 4.7, image: 'https://via.placeholder.com/300x200' }
  ];

  const quickActions = [
    { icon: FiCalendar, label: 'Book Court', link: '/courts', color: 'from-blue-500 to-blue-600' },
    { icon: FiClock, label: 'View History', link: '/dashboard/user/booking-history', color: 'from-purple-500 to-purple-600' },
    { icon: FiHeart, label: 'Saved Courts', link: '/dashboard/user/saved-courts', color: 'from-red-500 to-pink-600' },
    { icon: FiUser, label: 'Profile', link: '/dashboard/user/profile', color: 'from-green-500 to-green-600' }
  ];

  const recentActivity = [
    { id: 1, type: 'booking', title: 'Completed booking at Premier Court', time: '2 days ago', icon: FiCheckCircle, color: 'text-green-500' },
    { id: 2, type: 'payment', title: 'Payment of $120 processed', time: '2 days ago', icon: FiDollarSign, color: 'text-blue-500' },
    { id: 3, type: 'saved', title: 'Saved Elite Tennis Arena', time: '5 days ago', icon: FiHeart, color: 'text-red-500' },
    { id: 4, type: 'review', title: 'Left review for Downtown Court', time: '1 week ago', icon: FiStar, color: 'text-yellow-500' }
  ];

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

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-pink-500/10" />
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

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                  {userData.firstName[0]}{userData.lastName[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center border-4 border-white">
                  <FiCheckCircle className="text-white text-sm" />
                </div>
              </motion.div>

              {/* Greeting */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {getGreeting()}, {userData.firstName}! 👋
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <FiClock className="text-primary-500" />
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  {' • '}
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="warning" icon={FiAward}>
                    {userData.tier} Member
                  </Badge>
                  <Badge variant="info" icon={FiTarget}>
                    {userData.loyaltyPoints} Points
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass px-6 py-4 rounded-xl border border-primary-200/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FiCalendar className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-xs text-gray-600">Upcoming</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass px-6 py-4 rounded-xl border border-red-200/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <FiBell className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{notifications.filter(n => n.unread).length}</p>
                    <p className="text-xs text-gray-600">New Alerts</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                onMouseEnter={() => setHoveredCard(`stat-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
                className="glass p-6 rounded-2xl border border-gray-200/50 relative overflow-hidden cursor-pointer"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`} />
                
                <motion.div
                  variants={cardHoverVariants}
                  className="relative z-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`text-2xl ${stat.iconColor}`} />
                    </div>
                    <motion.div
                      animate={hoveredCard === `stat-${index}` ? { scale: 1.2, rotate: 360 } : {}}
                      transition={{ duration: 0.5 }}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                        stat.changeType === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      <FiTrendingUp className={stat.changeType === 'negative' ? 'rotate-180' : ''} />
                      <span className="text-xs font-semibold">{stat.change}</span>
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl border border-gray-200/50 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiZap className="text-primary-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.link}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                  >
                    <Icon className="text-3xl mb-3" />
                    <p className="font-semibold">{action.label}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Bookings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass rounded-2xl border border-gray-200/50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiCalendar className="text-primary-500" />
                Upcoming Bookings
              </h3>
              <Link to="/dashboard/user/upcoming-bookings">
                <Button variant="secondary" size="sm" icon={FiArrowRight}>
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingBookings.slice(0, 3).map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="glass p-4 rounded-xl border border-gray-200/50 flex gap-4 cursor-pointer"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={booking.image} alt={booking.courtName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900">{booking.courtName}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <FiMapPin className="text-primary-500" />
                          {booking.location}
                        </p>
                      </div>
                      <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="text-primary-500" />
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="text-purple-500" />
                        {booking.time}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-green-600">
                        <FiDollarSign />
                        {booking.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity & Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Notifications */}
            <div className="glass rounded-2xl border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FiBell className="text-primary-500" />
                  Notifications
                </h3>
                <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {notifications.filter(n => n.unread).length}
                </span>
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <motion.div
                    key={notification.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      notification.unread
                        ? 'bg-primary-50 border-primary-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === 'success' ? 'bg-green-100' :
                        notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        {notification.type === 'success' ? <FiCheckCircle className="text-green-600" /> :
                         notification.type === 'warning' ? <FiAlertCircle className="text-yellow-600" /> :
                         <FiBell className="text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Loyalty Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-2xl border border-orange-200/50 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <FiGift className="text-orange-500" />
                    Loyalty Rewards
                  </h3>
                  <Badge variant="warning" icon={FiAward}>
                    {userData.tier}
                  </Badge>
                </div>
                <div className="mb-4">
                  <div className="flex items-end gap-2 mb-2">
                    <p className="text-4xl font-bold text-gray-900">{userData.loyaltyPoints}</p>
                    <p className="text-gray-600 mb-1">points</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full"
                    />
                  </div>
                  <p className="text-sm text-gray-600">250 points to Platinum tier</p>
                </div>
                <Button variant="primary" size="sm" className="w-full" icon={FiGift}>
                  Redeem Points
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Saved Courts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl border border-gray-200/50 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiHeart className="text-red-500 fill-red-500" />
              Saved Courts
            </h3>
            <Link to="/dashboard/user/saved-courts">
              <Button variant="secondary" size="sm" icon={FiArrowRight}>
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedCourts.map((court, index) => (
              <motion.div
                key={court.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl overflow-hidden border border-gray-200/50 cursor-pointer"
              >
                <div className="relative h-40">
                  <img src={court.image} alt={court.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <FiStar className="text-yellow-500 fill-yellow-500 text-sm" />
                    <span className="text-sm font-semibold text-gray-900">{court.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{court.name}</h4>
                  <Badge variant="primary" className="text-xs">{court.sport}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
