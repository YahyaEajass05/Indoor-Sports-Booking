import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHeart,
  FiMapPin,
  FiStar,
  FiDollarSign,
  FiClock,
  FiUsers,
  FiCalendar,
  FiTrash2,
  FiExternalLink,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiTrendingUp,
  FiAward,
  FiZap,
  FiActivity
} from 'react-icons/fi';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

const SavedCourts = ({ savedCourts = [], onRemove, onBook, onViewDetails }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterSport, setFilterSport] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Filtering and sorting
  const filteredAndSortedCourts = useMemo(() => {
    let filtered = [...savedCourts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(court =>
        court.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.sport?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sport filter
    if (filterSport !== 'all') {
      filtered = filtered.filter(court => court.sport?.toLowerCase() === filterSport.toLowerCase());
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.savedAt) - new Date(a.savedAt);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-low':
          return (a.pricePerHour || 0) - (b.pricePerHour || 0);
        case 'price-high':
          return (b.pricePerHour || 0) - (a.pricePerHour || 0);
        case 'popular':
          return (b.bookings || 0) - (a.bookings || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [savedCourts, searchTerm, sortBy, filterSport]);

  const getSportIcon = (sport) => {
    // Return appropriate icon based on sport type
    return FiActivity;
  };

  const getSportColor = (sport) => {
    const colors = {
      basketball: 'from-orange-500 to-red-600',
      tennis: 'from-green-500 to-emerald-600',
      badminton: 'from-blue-500 to-cyan-600',
      volleyball: 'from-yellow-500 to-orange-600',
      football: 'from-purple-500 to-pink-600',
      default: 'from-gray-500 to-gray-700'
    };
    return colors[sport?.toLowerCase()] || colors.default;
  };

  // Statistics
  const stats = useMemo(() => {
    const total = savedCourts.length;
    const avgRating = savedCourts.reduce((sum, c) => sum + (c.rating || 0), 0) / (total || 1);
    const totalBookings = savedCourts.reduce((sum, c) => sum + (c.bookings || 0), 0);
    const sports = [...new Set(savedCourts.map(c => c.sport))].length;

    return { total, avgRating, totalBookings, sports };
  }, [savedCourts]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
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
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: -100,
      transition: { duration: 0.3 }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.03,
      y: -8,
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Saved Courts</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <FiHeart className="text-red-500 fill-red-500" />
            Your favorite courts in one place
          </p>
        </div>
      </div>

      {/* Statistics Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-gray-200/50 p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-400/10 to-pink-400/10 rounded-full blur-3xl" />
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <FiHeart className="text-2xl text-white fill-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Saved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <FiStar className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FiActivity className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sports</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sports}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-2xl border border-gray-200/50"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 relative w-full lg:w-auto">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courts by name, location, or sport..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={filterSport}
              onChange={(e) => setFilterSport(e.target.value)}
              className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
            >
              <option value="all">All Sports</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="badminton">Badminton</option>
              <option value="volleyball">Volleyball</option>
              <option value="football">Football</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
            >
              <option value="recent">Recently Saved</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* View Toggle */}
            <div className="flex gap-2 bg-white/50 p-1 rounded-xl border border-gray-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiGrid />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiList />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Courts Grid/List */}
      <AnimatePresence mode="popLayout">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAndSortedCourts.map((court, index) => (
              <motion.div
                key={court.id || index}
                variants={cardVariants}
                exit="exit"
                whileHover="hover"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="glass rounded-2xl border border-gray-200/50 overflow-hidden group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={court.image || 'https://via.placeholder.com/400x300'}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${getSportColor(court.sport)} opacity-20`} />
                  
                  {/* Sport Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" className="bg-white/90 backdrop-blur-sm">
                      {court.sport}
                    </Badge>
                  </div>

                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove?.(court.id);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
                  >
                    <FiHeart className="fill-red-500 text-red-500 group-hover:fill-white group-hover:text-white" />
                  </motion.button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <FiStar className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-gray-900">{court.rating || 0}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{court.name}</h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <FiMapPin className="text-primary-500 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">{court.location}</span>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiDollarSign className="text-green-500" />
                      <span>${court.pricePerHour}/hr</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiUsers className="text-blue-500" />
                      <span>{court.capacity || 0} players</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCalendar className="text-purple-500" />
                      <span>{court.bookings || 0} bookings</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiClock className="text-orange-500" />
                      <span>Open {court.hours || '24/7'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onBook?.(court)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Book Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onViewDetails?.(court)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                      <FiExternalLink />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-1 bg-gradient-to-r from-primary-500 to-purple-600 origin-left"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredAndSortedCourts.map((court, index) => (
              <motion.div
                key={court.id || index}
                variants={cardVariants}
                exit="exit"
                whileHover={hoverVariants.hover}
                className="glass rounded-2xl border border-gray-200/50 p-6 flex gap-6 items-center"
              >
                {/* Image */}
                <div className="relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={court.image || 'https://via.placeholder.com/400x300'}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${getSportColor(court.sport)} opacity-20`} />
                  <div className="absolute top-2 left-2">
                    <Badge variant="primary" className="bg-white/90 backdrop-blur-sm text-xs">
                      {court.sport}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{court.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiMapPin className="text-primary-500" />
                        <span className="text-sm">{court.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                        <FiStar className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">{court.rating || 0}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemove?.(court.id)}
                        className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                      >
                        <FiHeart className="fill-red-500 text-red-500" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiDollarSign className="text-green-500" />
                      <span>${court.pricePerHour}/hr</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiUsers className="text-blue-500" />
                      <span>{court.capacity || 0} players</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCalendar className="text-purple-500" />
                      <span>{court.bookings || 0} bookings</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiClock className="text-orange-500" />
                      <span>Open {court.hours || '24/7'}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onBook?.(court)}
                      className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Book Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onViewDetails?.(court)}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                      <FiExternalLink />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredAndSortedCourts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-16 rounded-2xl border border-gray-200/50 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full mb-6"
          >
            <FiHeart className="text-5xl text-red-500" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {searchTerm || filterSport !== 'all' ? 'No Courts Found' : 'No Saved Courts Yet'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterSport !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Start adding courts to your favorites to see them here'}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SavedCourts;
