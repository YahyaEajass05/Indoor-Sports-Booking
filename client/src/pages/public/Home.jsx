import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiShield,
  FiZap,
  FiUsers,
  FiClock,
  FiStar,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiPlay
} from 'react-icons/fi';
import PublicBackground from '../../components/layout/PublicBackground';

const Home = () => {
  const [stats, setStats] = useState({ courts: 0, bookings: 0, users: 0, rating: 0 });

  useEffect(() => {
    // Animate stats count up
    const targets = { courts: 150, bookings: 5000, users: 2500, rating: 4.8 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        courts: Math.floor(targets.courts * progress),
        bookings: Math.floor(targets.bookings * progress),
        users: Math.floor(targets.users * progress),
        rating: (targets.rating * progress).toFixed(1)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: FiCalendar,
      title: 'Easy Booking',
      description: 'Book courts in seconds with our intuitive platform',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: FiMapPin,
      title: 'Multiple Locations',
      description: 'Access courts across the city at your convenience',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: FiDollarSign,
      title: 'Best Prices',
      description: 'Competitive pricing with flexible payment options',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: FiShield,
      title: 'Secure Payments',
      description: 'Your transactions are safe and encrypted',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const sports = [
    { name: 'Basketball', courts: 45, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400' },
    { name: 'Tennis', courts: 38, image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400' },
    { name: 'Badminton', courts: 32, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400' },
    { name: 'Volleyball', courts: 25, image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Player',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'Best platform for booking courts! Easy to use and great customer service.'
    },
    {
      name: 'Mike Chen',
      role: 'Basketball Enthusiast',
      image: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      text: 'I book courts weekly. The app is smooth and payments are secure.'
    },
    {
      name: 'Emily Davis',
      role: 'Tennis Coach',
      image: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'Perfect for managing multiple bookings. Highly recommended!'
    }
  ];

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

  return (
    <div className="relative min-h-screen">
      <PublicBackground variant="default" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6"
              >
                <FiZap className="text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">Welcome to CourtBooker</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Book Your Favorite
                <span className="gradient-text block">Indoor Sports Courts</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Find and book basketball, tennis, badminton, and volleyball courts near you in just a few clicks
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link to="/courts">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <FiCalendar />
                    Book Now
                    <FiArrowRight />
                  </motion.button>
                </Link>

                <Link to="/how-it-works">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <FiPlay />
                    Learn More
                  </motion.button>
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {[
                  { label: 'Courts Available', value: stats.courts, suffix: '+', icon: FiMapPin },
                  { label: 'Total Bookings', value: stats.bookings, suffix: '+', icon: FiCalendar },
                  { label: 'Happy Users', value: stats.users, suffix: '+', icon: FiUsers },
                  { label: 'Average Rating', value: stats.rating, suffix: '★', icon: FiStar }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass p-6 rounded-2xl border border-gray-200/50"
                    >
                      <Icon className="text-3xl text-primary-600 mb-2" />
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}{stat.suffix}
                      </p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose <span className="gradient-text">CourtBooker</span>
              </h2>
              <p className="text-xl text-gray-600">Everything you need for seamless court bookings</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="glass p-8 rounded-2xl border border-gray-200/50 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl`} />
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className="text-3xl text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Sports Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Popular <span className="gradient-text">Sports</span>
              </h2>
              <p className="text-xl text-gray-600">Find courts for your favorite indoor sports</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {sports.map((sport, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass rounded-2xl overflow-hidden border border-gray-200/50 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={sport.image} alt={sport.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{sport.name}</h3>
                      <p className="text-sm text-white/90">{sport.courts} courts available</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link to="/courts">
                      <button className="w-full py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold hover:bg-primary-200 transition-colors">
                        View Courts
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our <span className="gradient-text">Users Say</span>
              </h2>
              <p className="text-xl text-gray-600">Trusted by thousands of sports enthusiasts</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass p-8 rounded-2xl border border-gray-200/50"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass rounded-3xl border border-gray-200/50 p-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Ready to <span className="gradient-text">Get Started?</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Join thousands of users booking courts effortlessly
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/auth/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Sign Up Free
                    </motion.button>
                  </Link>
                  <Link to="/courts">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white border-2 border-primary-500 text-primary-700 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Browse Courts
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
