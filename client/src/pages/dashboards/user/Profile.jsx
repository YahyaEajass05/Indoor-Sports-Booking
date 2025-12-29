import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileInfo from '../../../components/user/ProfileInfo';
import PaymentMethods from '../../../components/user/PaymentMethods';
import {
  FiUser,
  FiCreditCard,
  FiSettings,
  FiShield,
  FiBell,
  FiActivity
} from 'react-icons/fi';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
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
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: FiUser },
    { id: 'payment', label: 'Payment Methods', icon: FiCreditCard },
    { id: 'activity', label: 'Activity Log', icon: FiActivity }
  ];

  const handleUpdateProfile = (data) => {
    console.log('Update profile:', data);
    alert('Profile updated successfully!');
  };

  const handleUploadAvatar = (file) => {
    console.log('Upload avatar:', file);
    alert('Avatar uploaded successfully!');
  };

  const handleAddPayment = (data) => {
    console.log('Add payment:', data);
    alert('Payment method added!');
  };

  const handleEditPayment = (data) => {
    console.log('Edit payment:', data);
    alert('Payment method updated!');
  };

  const handleDeletePayment = (id) => {
    console.log('Delete payment:', id);
    alert('Payment method deleted!');
  };

  const handleSetDefaultPayment = (id) => {
    console.log('Set default:', id);
    alert('Default payment method updated!');
  };

  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
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

          <div className="relative z-10">
            <h1 className="text-4xl font-bold gradient-text mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl border border-gray-200/50 p-2"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[200px] px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="text-xl" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {activeTab === 'profile' && (
              <ProfileInfo
                user={mockUser}
                onUpdate={handleUpdateProfile}
                onUploadAvatar={handleUploadAvatar}
              />
            )}

            {activeTab === 'payment' && (
              <PaymentMethods
                paymentMethods={mockPaymentMethods}
                onAdd={handleAddPayment}
                onEdit={handleEditPayment}
                onDelete={handleDeletePayment}
                onSetDefault={handleSetDefaultPayment}
              />
            )}

            {activeTab === 'activity' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl border border-gray-200/50 p-8"
              >
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full mb-6">
                    <FiActivity className="text-4xl text-primary-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Activity Log</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Track your recent activities, login history, and account changes
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 text-sm text-gray-500"
                  >
                    Coming soon...
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Profile;
