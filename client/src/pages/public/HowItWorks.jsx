import { motion } from 'framer-motion';
import {
  FiSearch,
  FiCalendar,
  FiCreditCard,
  FiCheckCircle,
  FiMapPin,
  FiClock,
  FiUser,
  FiStar
} from 'react-icons/fi';
import PublicBackground from '../../components/layout/PublicBackground';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: FiSearch,
      title: 'Find Your Court',
      description: 'Browse through our extensive collection of courts. Filter by sport, location, price, and availability to find the perfect match.',
      features: ['Search by location', 'Filter by sport type', 'View real-time availability', 'Compare prices'],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      number: '02',
      icon: FiCalendar,
      title: 'Select Date & Time',
      description: 'Choose your preferred date and time slot. Our calendar shows real-time availability so you know exactly what\'s open.',
      features: ['Interactive calendar', 'Real-time slots', 'Flexible timing', 'Recurring bookings'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      number: '03',
      icon: FiCreditCard,
      title: 'Secure Payment',
      description: 'Complete your booking with our secure payment system. We accept all major payment methods for your convenience.',
      features: ['Multiple payment options', 'Secure encryption', 'Instant confirmation', 'Digital receipt'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      number: '04',
      icon: FiCheckCircle,
      title: 'Play & Enjoy',
      description: 'Receive instant confirmation and show up at your booked time. Your court is ready and waiting for you!',
      features: ['Instant confirmation', 'Email & SMS alerts', 'Easy cancellation', '24/7 support'],
      color: 'from-orange-500 to-red-600'
    }
  ];

  const benefits = [
    { icon: FiClock, title: '24/7 Booking', description: 'Book courts anytime, anywhere' },
    { icon: FiMapPin, title: 'Multiple Locations', description: 'Courts across the city' },
    { icon: FiStar, title: 'Quality Assured', description: 'Premium facilities only' },
    { icon: FiUser, title: 'Easy Management', description: 'View and manage all bookings' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
      <PublicBackground variant="green" />

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How <span className="gradient-text">CourtBooker</span> Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Book your favorite indoor sports courts in just 4 simple steps
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12 mb-20"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02, x: isEven ? 10 : -10 }}
                      className="glass p-8 rounded-2xl border border-gray-200/50 relative overflow-hidden"
                    >
                      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-64 h-64 bg-gradient-to-br ${step.color} opacity-10 rounded-full blur-3xl`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-6xl font-bold text-gray-200">{step.number}</span>
                          <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                            <Icon className="text-3xl text-white" />
                          </div>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                        <p className="text-lg text-gray-600 mb-6">{step.description}</p>

                        <div className="grid grid-cols-2 gap-3">
                          {step.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <FiCheckCircle className="text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-64 h-64 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center shadow-2xl`}
                    >
                      <Icon className="text-8xl text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose <span className="gradient-text">Our Platform</span>
              </h2>
              <p className="text-xl text-gray-600">Benefits that make booking effortless</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="glass p-6 rounded-2xl border border-gray-200/50 text-center"
                  >
                    <div className="inline-flex w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl items-center justify-center mb-4">
                      <Icon className="text-3xl text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl border border-gray-200/50 p-12 text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users booking courts effortlessly
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courts">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold text-lg shadow-lg"
                >
                  Browse Courts
                </motion.button>
              </Link>
              <Link to="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-primary-500 text-primary-700 rounded-xl font-bold text-lg shadow-lg"
                >
                  Sign Up Free
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
