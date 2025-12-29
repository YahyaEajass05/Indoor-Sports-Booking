import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin,
  FiDollarSign,
  FiStar,
  FiClock,
  FiUsers,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiHeart,
  FiCalendar
} from 'react-icons/fi';
import PublicBackground from '../../components/layout/PublicBackground';
import { Link } from 'react-router-dom';

const Courts = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const courts = [
    {
      id: 1,
      name: 'Premier Basketball Court',
      sport: 'Basketball',
      location: 'Downtown Sports Complex',
      address: '123 Main Street, Downtown',
      price: 60,
      rating: 4.8,
      reviews: 156,
      capacity: 10,
      amenities: ['Parking', 'Locker Rooms', 'Cafeteria', 'WiFi'],
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600',
      featured: true
    },
    {
      id: 2,
      name: 'Elite Tennis Arena',
      sport: 'Tennis',
      location: 'Riverside Sports Center',
      address: '456 River Road, Riverside',
      price: 75,
      rating: 4.9,
      reviews: 203,
      capacity: 4,
      amenities: ['Parking', 'Pro Shop', 'Coaching Available'],
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=600',
      featured: true
    },
    {
      id: 3,
      name: 'Pro Badminton Hall',
      sport: 'Badminton',
      location: 'City Sports Hub',
      address: '789 City Center, Downtown',
      price: 45,
      rating: 4.7,
      reviews: 128,
      capacity: 4,
      amenities: ['Parking', 'Equipment Rental', 'Shower Facilities'],
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600',
      featured: false
    },
    {
      id: 4,
      name: 'Indoor Soccer Arena',
      sport: 'Football',
      location: 'Westside Complex',
      address: '654 West Boulevard, Westside',
      price: 100,
      rating: 4.8,
      reviews: 187,
      capacity: 22,
      amenities: ['Parking', 'Full Field', 'Training Equipment'],
      availability: 'Limited',
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600',
      featured: true
    },
    {
      id: 5,
      name: 'Volleyball Center',
      sport: 'Volleyball',
      location: 'Eastside Athletic Club',
      address: '321 East Avenue, Eastside',
      price: 55,
      rating: 4.6,
      reviews: 95,
      capacity: 12,
      amenities: ['Parking', 'Sand Courts', 'Beach Volleyball'],
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600',
      featured: false
    },
    {
      id: 6,
      name: 'Championship Basketball Arena',
      sport: 'Basketball',
      location: 'North Sports Complex',
      address: '987 North Street, North District',
      price: 80,
      rating: 4.9,
      reviews: 234,
      capacity: 12,
      amenities: ['Parking', 'Locker Rooms', 'Sports Bar', 'WiFi'],
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600',
      featured: true
    }
  ];

  const filteredCourts = useMemo(() => {
    let filtered = courts;

    if (searchTerm) {
      filtered = filtered.filter(court =>
        court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSport !== 'all') {
      filtered = filtered.filter(court => court.sport === selectedSport);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(court => court.location === selectedLocation);
    }

    if (priceRange !== 'all') {
      const ranges = {
        low: [0, 50],
        medium: [51, 75],
        high: [76, Infinity]
      };
      const [min, max] = ranges[priceRange];
      filtered = filtered.filter(court => court.price >= min && court.price <= max);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'featured': return b.featured - a.featured;
        default: return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedSport, selectedLocation, priceRange, sortBy]);

  const sports = [...new Set(courts.map(c => c.sport))];
  const locations = [...new Set(courts.map(c => c.location))];

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
    <div className="relative min-h-screen">
      <PublicBackground variant="blue" />

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Find Your Perfect <span className="gradient-text">Court</span>
            </h1>
            <p className="text-xl text-gray-600">
              Browse and book from {courts.length} available courts across the city
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl border border-gray-200/50 p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courts by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Sports</option>
                  {sports.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>

                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>

                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Prices</option>
                  <option value="low">$0 - $50</option>
                  <option value="medium">$51 - $75</option>
                  <option value="high">$76+</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <div className="flex gap-2 bg-white/50 p-1 rounded-xl border border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600'}`}
                  >
                    <FiGrid />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600'}`}
                  >
                    <FiList />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredCourts.length}</span> courts
          </div>

          {/* Courts Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}
            >
              {filteredCourts.map((court) => (
                <motion.div
                  key={court.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`glass rounded-2xl border border-gray-200/50 overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${viewMode === 'list' ? 'md:w-80' : 'h-48'} overflow-hidden`}>
                    <img src={court.image} alt={court.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {court.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                    >
                      <FiHeart />
                    </motion.button>

                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <FiStar className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{court.rating}</span>
                      <span className="text-xs text-gray-600">({court.reviews})</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{court.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                          <FiMapPin className="text-primary-500" />
                          {court.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                        {court.sport}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {court.availability}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiDollarSign className="text-green-500" />
                        ${court.price}/hr
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiUsers className="text-blue-500" />
                        Up to {court.capacity}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {court.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {amenity}
                        </span>
                      ))}
                      {court.amenities.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          +{court.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link to="/auth/login" className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                          <FiCalendar className="inline mr-2" />
                          Book Now
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredCourts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-16 rounded-2xl border border-gray-200/50 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <FiMapPin className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Courts Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSport('all');
                  setSelectedLocation('all');
                  setPriceRange('all');
                }}
                className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courts;
