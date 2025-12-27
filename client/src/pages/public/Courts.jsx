import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Calendar, Filter, Star, Heart, ChevronDown,
  Grid, List, SlidersHorizontal, X, Check, DollarSign, Clock,
  Users, Wifi, Car, Coffee, Zap, Shield, TrendingUp, Award
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Courts = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');

  const courts = [
    {
      id: 1, name: 'Elite Basketball Arena', sport: 'Basketball',
      location: 'Downtown Sports Complex, 2.3 km away',
      rating: 4.9, reviews: 234, price: 50,
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      amenities: ['AC', 'Parking', 'Locker Room', 'Shower', 'Cafe'],
      availability: 'Available Today', featured: true
    },
    {
      id: 2, name: 'Pro Badminton Center', sport: 'Badminton',
      location: 'Riverside Sports Hub, 3.1 km away',
      rating: 4.8, reviews: 189, price: 35,
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800',
      amenities: ['AC', 'Shower', 'Parking', 'Water'],
      availability: 'Available Today', featured: false
    },
    {
      id: 3, name: 'Champions Tennis Court', sport: 'Tennis',
      location: 'Greenfield Sports Arena, 4.5 km away',
      rating: 4.7, reviews: 156, price: 45,
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800',
      amenities: ['Lighting', 'Parking', 'Cafe', 'Equipment'],
      availability: 'Available Today', featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      <HeroSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
      />

      <FilterBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        sortBy={sortBy}
        setSortBy={setSortBy}
        courtsCount={courts.length}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AnimatePresence>
            {filterOpen && (
              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedAmenities={selectedAmenities}
                setSelectedAmenities={setSelectedAmenities}
                setFilterOpen={setFilterOpen}
              />
            )}
          </AnimatePresence>

          <div className="flex-1">
            <CourtsList courts={courts} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSearch = ({ searchQuery, setSearchQuery, selectedSport, setSelectedSport }) => {
  const sports = ['All Sports', 'Basketball', 'Badminton', 'Tennis', 'Football', 'Squash'];

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-900 via-dark-800 to-secondary-900 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Find Your Perfect <span className="gradient-text">Court</span>
          </h1>
          <p className="text-xl text-gray-300">Discover and book premium sports courts near you</p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass p-4 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by court name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="appearance-none px-6 py-4 pr-12 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none cursor-pointer"
                >
                  {sports.map((sport) => (
                    <option key={sport} value={sport.toLowerCase()} className="bg-dark-800">
                      {sport}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FilterBar = ({ viewMode, setViewMode, filterOpen, setFilterOpen, sortBy, setSortBy, courtsCount }) => {
  return (
    <div className="sticky top-20 z-40 bg-dark-900/95 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                filterOpen ? 'bg-primary-500 text-white' : 'bg-white/10 text-gray-300'
              }`}
              onClick={() => setFilterOpen(!filterOpen)}
              whileHover={{ scale: 1.05 }}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </motion.button>
            <span className="text-gray-400">
              <span className="text-white font-semibold">{courtsCount}</span> courts found
            </span>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white cursor-pointer"
            >
              <option value="popularity" className="bg-dark-800">Most Popular</option>
              <option value="price-low" className="bg-dark-800">Price: Low to High</option>
              <option value="rating" className="bg-dark-800">Highest Rated</option>
            </select>

            <div className="flex gap-2 p-1 bg-white/10 rounded-lg">
              <motion.button
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-400'}`}
                onClick={() => setViewMode('grid')}
                whileHover={{ scale: 1.1 }}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-400'}`}
                onClick={() => setViewMode('list')}
                whileHover={{ scale: 1.1 }}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterSidebar = ({ priceRange, setPriceRange, selectedAmenities, setSelectedAmenities, setFilterOpen }) => {
  const amenities = ['AC', 'Parking', 'Locker Room', 'Shower', 'Cafe', 'Equipment', 'First Aid'];

  return (
    <motion.div
      className="w-80 bg-dark-900 rounded-2xl p-6 border border-white/10 h-fit sticky top-32"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Filters</h3>
        <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-white font-semibold mb-4">Price Range</h4>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="flex-1"
            />
            <span className="text-white font-bold">${priceRange[1]}</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Amenities</h4>
          <div className="space-y-2">
            {amenities.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAmenities([...selectedAmenities, amenity]);
                    } else {
                      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                    }
                  }}
                  className="w-4 h-4 rounded accent-primary-500"
                />
                <span className="text-gray-300">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <motion.button
          className="w-full py-3 bg-primary-500 text-white font-bold rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Apply Filters
        </motion.button>
      </div>
    </motion.div>
  );
};

const CourtsList = ({ courts, viewMode }) => {
  return (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
      {courts.map((court, index) => (
        <CourtCard key={court.id} court={court} index={index} viewMode={viewMode} />
      ))}
    </div>
  );
};

const CourtCard = ({ court, index, viewMode }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={viewMode === 'list' ? 'flex gap-6' : ''}
    >
      <div className="bg-dark-800 rounded-2xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all">
        <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64' : 'h-64'}`}>
          <motion.img
            src={court.image}
            alt={court.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
          
          <motion.button
            className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center ${
              liked ? 'bg-red-500 text-white' : 'bg-white/10 text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-white' : ''}`} />
          </motion.button>

          {court.featured && (
            <span className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold rounded-full">
              Featured
            </span>
          )}
        </div>

        <div className="p-6 flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">{court.name}</h3>
          <p className="text-gray-400 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {court.location}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(court.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                />
              ))}
            </div>
            <span className="text-white font-semibold">{court.rating}</span>
            <span className="text-gray-400 text-sm">({court.reviews} reviews)</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {court.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full">
                {amenity}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <p className="text-gray-400 text-sm">From</p>
              <p className="text-2xl font-bold text-white">${court.price}<span className="text-sm">/hr</span></p>
            </div>
            <Link to={`/court/${court.id}`}>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Courts;
