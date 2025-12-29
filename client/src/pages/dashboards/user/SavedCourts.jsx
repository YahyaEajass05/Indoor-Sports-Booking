import { useState } from 'react';
import { motion } from 'framer-motion';
import SavedCourtsComponent from '../../../components/user/SavedCourts';
import {
  FiHeart,
  FiMapPin,
  FiStar,
  FiTrendingUp
} from 'react-icons/fi';

const SavedCourts = () => {
  // Mock saved courts data
  const mockSavedCourts = [
    {
      id: 1,
      name: 'Premier Basketball Court',
      sport: 'Basketball',
      location: 'Downtown Sports Complex',
      rating: 4.8,
      pricePerHour: 60,
      capacity: 10,
      bookings: 156,
      hours: '6AM - 10PM',
      savedAt: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
      amenities: ['Parking', 'Locker Rooms', 'Cafeteria', 'WiFi'],
      address: '123 Main Street, Downtown'
    },
    {
      id: 2,
      name: 'Elite Tennis Arena',
      sport: 'Tennis',
      location: 'Riverside Sports Center',
      rating: 4.9,
      pricePerHour: 75,
      capacity: 4,
      bookings: 203,
      hours: '7AM - 9PM',
      savedAt: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400',
      amenities: ['Parking', 'Pro Shop', 'Coaching Available'],
      address: '456 River Road, Riverside'
    },
    {
      id: 3,
      name: 'Pro Badminton Hall',
      sport: 'Badminton',
      location: 'City Sports Hub',
      rating: 4.7,
      pricePerHour: 45,
      capacity: 4,
      bookings: 128,
      hours: '8AM - 10PM',
      savedAt: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400',
      amenities: ['Parking', 'Equipment Rental', 'Shower Facilities'],
      address: '789 City Center, Downtown'
    },
    {
      id: 4,
      name: 'Volleyball Center',
      sport: 'Volleyball',
      location: 'Eastside Athletic Club',
      rating: 4.6,
      pricePerHour: 55,
      capacity: 12,
      bookings: 95,
      hours: '9AM - 8PM',
      savedAt: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400',
      amenities: ['Parking', 'Sand Courts', 'Beach Volleyball'],
      address: '321 East Avenue, Eastside'
    },
    {
      id: 5,
      name: 'Indoor Soccer Arena',
      sport: 'Football',
      location: 'Westside Complex',
      rating: 4.8,
      pricePerHour: 100,
      capacity: 22,
      bookings: 187,
      hours: '6AM - 11PM',
      savedAt: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400',
      amenities: ['Parking', 'Full Field', 'Training Equipment', 'Locker Rooms'],
      address: '654 West Boulevard, Westside'
    },
    {
      id: 6,
      name: 'Squash Courts Pro',
      sport: 'Squash',
      location: 'North Sports Arena',
      rating: 4.7,
      pricePerHour: 40,
      capacity: 2,
      bookings: 112,
      hours: '7AM - 10PM',
      savedAt: '2023-12-28',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
      amenities: ['Parking', 'Pro Shop', 'Equipment Rental'],
      address: '987 North Street, North District'
    }
  ];

  const handleRemoveCourt = (id) => {
    console.log('Remove court:', id);
    alert('Court removed from favorites!');
  };

  const handleBookCourt = (court) => {
    console.log('Book court:', court);
    alert(`Booking ${court.name}...`);
  };

  const handleViewDetails = (court) => {
    console.log('View details:', court);
    alert(`Viewing details for ${court.name}`);
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
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-pink-500/5 to-purple-500/5" />
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
              backgroundImage: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          <div className="relative z-10">
            <h1 className="text-4xl font-bold gradient-text mb-2">Saved Courts</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <FiHeart className="text-red-500 fill-red-500" />
              Your favorite courts in one place
            </p>
          </div>
        </motion.div>

        {/* Main Component */}
        <SavedCourtsComponent
          savedCourts={mockSavedCourts}
          onRemove={handleRemoveCourt}
          onBook={handleBookCourt}
          onViewDetails={handleViewDetails}
        />
      </div>
    </motion.div>
  );
};

export default SavedCourts;
