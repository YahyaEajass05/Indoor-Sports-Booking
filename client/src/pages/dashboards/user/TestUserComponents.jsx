import { useState } from 'react';
import { motion } from 'framer-motion';
import BookingHistoryTable from '../../../components/user/BookingHistoryTable';
import PaymentMethods from '../../../components/user/PaymentMethods';
import ProfileInfo from '../../../components/user/ProfileInfo';
import SavedCourts from '../../../components/user/SavedCourts';

/**
 * Test Component for User Dashboard Components
 * This component provides a comprehensive test environment for all user components
 */
const TestUserComponents = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  // Mock data for testing
  const mockBookings = [
    {
      bookingId: 'BK-2024-001',
      courtName: 'Premier Basketball Court',
      location: 'Downtown Sports Complex',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '16:00',
      amount: '120.00',
      status: 'completed'
    },
    {
      bookingId: 'BK-2024-002',
      courtName: 'Elite Tennis Arena',
      location: 'Riverside Sports Center',
      date: '2024-01-18',
      startTime: '10:00',
      endTime: '12:00',
      amount: '150.00',
      status: 'confirmed'
    },
    {
      bookingId: 'BK-2024-003',
      courtName: 'Pro Badminton Hall',
      location: 'City Sports Hub',
      date: '2024-01-20',
      startTime: '18:00',
      endTime: '20:00',
      amount: '90.00',
      status: 'pending'
    },
    {
      bookingId: 'BK-2024-004',
      courtName: 'Indoor Soccer Arena',
      location: 'Westside Complex',
      date: '2024-01-10',
      startTime: '16:00',
      endTime: '18:00',
      amount: '200.00',
      status: 'cancelled'
    }
  ];

  const mockPaymentMethods = [
    {
      id: 1,
      cardType: 'visa',
      cardNumber: '**** **** **** 4532',
      cardholderName: 'John Doe',
      expiryDate: '12/25',
      isDefault: true,
      lastUsed: '2 days ago',
      transactions: 24,
      billingAddress: '123 Main St',
      city: 'New York',
      zipCode: '10001'
    },
    {
      id: 2,
      cardType: 'mastercard',
      cardNumber: '**** **** **** 8765',
      cardholderName: 'John Doe',
      expiryDate: '08/26',
      isDefault: false,
      lastUsed: '1 week ago',
      transactions: 12,
      billingAddress: '456 Oak Ave',
      city: 'Los Angeles',
      zipCode: '90001'
    },
    {
      id: 3,
      cardType: 'amex',
      cardNumber: '**** ****** *1234',
      cardholderName: 'John Doe',
      expiryDate: '03/27',
      isDefault: false,
      lastUsed: '2 weeks ago',
      transactions: 8,
      billingAddress: '789 Pine St',
      city: 'Chicago',
      zipCode: '60601'
    }
  ];

  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    bio: 'Passionate sports enthusiast and regular court user. Love playing basketball and tennis!',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    avatar: null,
    memberSince: '2023',
    loyaltyPoints: 1250,
    totalBookings: 24,
    totalSpent: 2450,
    tier: 'Gold'
  };

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
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'
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
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400'
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
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400'
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
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400'
    }
  ];

  const components = [
    { id: 'history', label: 'Booking History' },
    { id: 'payments', label: 'Payment Methods' },
    { id: 'profile', label: 'Profile Info' },
    { id: 'saved', label: 'Saved Courts' }
  ];

  const handleViewDetails = (booking) => {
    console.log('View booking details:', booking);
    alert(`Viewing details for ${booking.courtName}`);
  };

  const handleDownloadReceipt = (booking) => {
    console.log('Download receipt:', booking);
    alert(`Downloading receipt for ${booking.bookingId}`);
  };

  const handleAddPayment = (data) => {
    console.log('Add payment method:', data);
    alert('Payment method added successfully!');
  };

  const handleEditPayment = (data) => {
    console.log('Edit payment method:', data);
    alert('Payment method updated successfully!');
  };

  const handleDeletePayment = (id) => {
    console.log('Delete payment method:', id);
    alert('Payment method deleted successfully!');
  };

  const handleSetDefaultPayment = (id) => {
    console.log('Set default payment:', id);
    alert('Default payment method updated!');
  };

  const handleUpdateProfile = (data) => {
    console.log('Update profile:', data);
    alert('Profile updated successfully!');
  };

  const handleUploadAvatar = (file) => {
    console.log('Upload avatar:', file);
    alert('Avatar uploaded successfully!');
  };

  const handleRemoveCourt = (id) => {
    console.log('Remove saved court:', id);
    alert('Court removed from favorites!');
  };

  const handleBookCourt = (court) => {
    console.log('Book court:', court);
    alert(`Booking ${court.name}...`);
  };

  const handleViewCourtDetails = (court) => {
    console.log('View court details:', court);
    alert(`Viewing details for ${court.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl border border-gray-200/50 p-6"
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">
            User Components Test Suite
          </h1>
          <p className="text-gray-600">
            Testing all user dashboard components with mock data
          </p>
        </motion.div>

        {/* Component Selector */}
        <div className="glass rounded-2xl border border-gray-200/50 p-4">
          <div className="flex flex-wrap gap-3">
            {components.map((comp) => (
              <motion.button
                key={comp.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveComponent(comp.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeComponent === comp.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {comp.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Component Display */}
        <motion.div
          key={activeComponent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeComponent === 'history' && (
            <BookingHistoryTable
              bookings={mockBookings}
              onViewDetails={handleViewDetails}
              onDownloadReceipt={handleDownloadReceipt}
            />
          )}

          {activeComponent === 'payments' && (
            <PaymentMethods
              paymentMethods={mockPaymentMethods}
              onAdd={handleAddPayment}
              onEdit={handleEditPayment}
              onDelete={handleDeletePayment}
              onSetDefault={handleSetDefaultPayment}
            />
          )}

          {activeComponent === 'profile' && (
            <ProfileInfo
              user={mockUser}
              onUpdate={handleUpdateProfile}
              onUploadAvatar={handleUploadAvatar}
            />
          )}

          {activeComponent === 'saved' && (
            <SavedCourts
              savedCourts={mockSavedCourts}
              onRemove={handleRemoveCourt}
              onBook={handleBookCourt}
              onViewDetails={handleViewCourtDetails}
            />
          )}
        </motion.div>

        {/* Test Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl border border-green-200/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ Testing Features</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• All components are rendered with mock data</li>
            <li>• Advanced animations using Framer Motion</li>
            <li>• Interactive filtering, sorting, and search functionality</li>
            <li>• Responsive design for all screen sizes</li>
            <li>• Modern glassmorphism UI with gradient accents</li>
            <li>• Hover effects, transitions, and micro-interactions</li>
            <li>• Form validation and error handling</li>
            <li>• Modal dialogs and confirmation prompts</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default TestUserComponents;
