import { motion } from 'framer-motion';
import {
  FiTarget,
  FiEye,
  FiHeart,
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiShield
} from 'react-icons/fi';
import PublicBackground from '../../components/layout/PublicBackground';

const AboutUs = () => {
  const stats = [
    { icon: FiUsers, label: 'Active Users', value: '10,000+', color: 'from-blue-500 to-cyan-600' },
    { icon: FiTrendingUp, label: 'Courts Listed', value: '150+', color: 'from-purple-500 to-pink-600' },
    { icon: FiAward, label: 'Cities Covered', value: '25+', color: 'from-green-500 to-emerald-600' },
    { icon: FiZap, label: 'Bookings Made', value: '50,000+', color: 'from-orange-500 to-red-600' }
  ];

  const values = [
    {
      icon: FiTarget,
      title: 'Our Mission',
      description: 'To make indoor sports accessible to everyone by providing a seamless booking experience for courts across the city.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: FiEye,
      title: 'Our Vision',
      description: 'To become the leading platform for indoor sports bookings, connecting players with the best facilities worldwide.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: FiHeart,
      title: 'Our Values',
      description: 'We believe in transparency, customer satisfaction, innovation, and building a community of sports enthusiasts.',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://i.pravatar.cc/200?img=12',
      bio: '10+ years in sports technology'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      image: 'https://i.pravatar.cc/200?img=45',
      bio: 'Tech leader with passion for innovation'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Operations',
      image: 'https://i.pravatar.cc/200?img=33',
      bio: 'Expert in facility management'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Customer Success',
      image: 'https://i.pravatar.cc/200?img=47',
      bio: 'Dedicated to user experience'
    }
  ];

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
      <PublicBackground variant="purple" />

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6"
            >
              <FiHeart className="text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">About CourtBooker</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Players with
              <span className="gradient-text block">Perfect Courts</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize how people book and enjoy indoor sports facilities.
              Making it easier, faster, and more convenient for everyone.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-8 rounded-2xl border border-gray-200/50 text-center"
                >
                  <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl items-center justify-center mb-4`}>
                    <Icon className="text-3xl text-white" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mission, Vision, Values */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass p-8 rounded-2xl border border-gray-200/50 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.color} opacity-10 rounded-full blur-2xl`} />
                  <div className="relative z-10">
                    <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl items-center justify-center mb-4`}>
                      <Icon className="text-3xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl border border-gray-200/50 p-12 mb-20"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  CourtBooker was born out of frustration with the complicated process of booking indoor sports facilities.
                  Our founders, passionate sports players themselves, experienced firsthand the hassle of calling multiple
                  venues, waiting for callbacks, and dealing with unclear availability.
                </p>
                <p>
                  In 2023, we launched CourtBooker with a simple goal: make booking sports courts as easy as ordering food
                  online. We started with just 10 courts in one city, and today we've grown to serve thousands of users
                  across 25 cities with over 150 premium facilities.
                </p>
                <p>
                  What sets us apart is our commitment to both players and venue owners. We've built a platform that
                  benefits everyone - making it easier for players to find and book courts, while helping venue owners
                  manage their facilities more efficiently and reach more customers.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Meet Our <span className="gradient-text">Team</span>
              </h2>
              <p className="text-xl text-gray-600">
                Passionate individuals dedicated to making sports accessible
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass rounded-2xl border border-gray-200/50 overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl border border-gray-200/50 p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose <span className="gradient-text">CourtBooker</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: FiZap,
                  title: 'Instant Booking',
                  description: 'Book courts in seconds without waiting for confirmations'
                },
                {
                  icon: FiShield,
                  title: 'Secure Payments',
                  description: 'Your transactions are protected with bank-level encryption'
                },
                {
                  icon: FiUsers,
                  title: 'Community',
                  description: 'Join thousands of sports enthusiasts like you'
                },
                {
                  icon: FiAward,
                  title: 'Best Facilities',
                  description: 'Access to premium, well-maintained sports venues'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex gap-4 p-6 bg-white/50 rounded-xl"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Icon className="text-2xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
