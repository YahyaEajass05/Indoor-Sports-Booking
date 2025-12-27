import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Star, Quote, Heart, TrendingUp, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Popular Courts Section
export const PopularCourtsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const courts = [
    {
      id: 1,
      name: 'Elite Basketball Arena',
      location: 'Downtown Sports Complex',
      rating: 4.9,
      reviews: 234,
      price: 50,
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500',
      sport: 'Basketball',
      amenities: ['AC', 'Parking', 'Locker Room']
    },
    {
      id: 2,
      name: 'Pro Badminton Center',
      location: 'Riverside Sports Hub',
      rating: 4.8,
      reviews: 189,
      price: 35,
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
      sport: 'Badminton',
      amenities: ['AC', 'Shower', 'Parking']
    },
    {
      id: 3,
      name: 'Champions Tennis Court',
      location: 'Greenfield Sports Arena',
      rating: 4.7,
      reviews: 156,
      price: 45,
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=500',
      sport: 'Tennis',
      amenities: ['Lighting', 'Parking', 'Cafe']
    }
  ];

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Popular <span className="gradient-text">Courts</span>
          </h2>
          <p className="text-xl text-gray-400">Book the best courts in your city</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courts.map((court, index) => (
            <motion.div
              key={court.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-dark-800 border border-white/10 hover:border-primary-500/50 transition-all">
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                  
                  <motion.button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>

                  <span className="absolute top-4 left-4 px-4 py-2 bg-primary-500 text-white text-sm font-semibold rounded-full">
                    {court.sport}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{court.name}</h3>
                  <p className="text-gray-400 mb-4 flex items-center gap-2">
                    <span>📍</span>
                    {court.location}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(court.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-white font-semibold">{court.rating}</span>
                      <span className="text-gray-400 text-sm">({court.reviews})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {court.amenities.map((amenity, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-gray-400 text-sm">Starting from</span>
                      <p className="text-2xl font-bold text-white">${court.price}<span className="text-sm text-gray-400">/hr</span></p>
                    </div>
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <Link to="/courts">
            <motion.button
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Courts
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Stats Section
export const StatsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const stats = [
    { value: 10000, suffix: '+', label: 'Happy Users', icon: Users },
    { value: 500, suffix: '+', label: 'Sports Venues', icon: TrendingUp },
    { value: 50000, suffix: '+', label: 'Bookings Made', icon: Clock },
    { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: Star }
  ];

  return (
    <section className="py-32 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10" />
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Impact in <span className="text-white/90">Numbers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.div
                className="text-6xl md:text-7xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
              >
                {inView && <CountUp end={stat.value} duration={2.5} />}
                {stat.suffix}
              </motion.div>
              <p className="text-xl text-white/90 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
export const TestimonialsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Basketball Player',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'Amazing platform! Booking courts has never been easier. The interface is intuitive and the selection is great.'
    },
    {
      name: 'Sarah Williams',
      role: 'Badminton Enthusiast',
      image: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      text: 'I love how easy it is to find and book courts near me. The payment process is seamless and secure.'
    },
    {
      name: 'Mike Chen',
      role: 'Tennis Coach',
      image: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      text: 'Perfect for scheduling multiple sessions. The customer support is top-notch and very responsive.'
    }
  ];

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            What Our <span className="gradient-text">Users Say</span>
          </h2>
          <p className="text-xl text-gray-400">Real experiences from real people</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 h-full">
                <Quote className="w-12 h-12 text-primary-500/30 mb-4" />
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>

                <div className="flex items-center gap-4">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-primary-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
export const WhyChooseUsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const reasons = [
    {
      title: 'Best Price Guarantee',
      description: 'We offer the most competitive prices in the market with no hidden fees',
      icon: '💰'
    },
    {
      title: 'Quality Assurance',
      description: 'All courts are verified and meet our high-quality standards',
      icon: '✅'
    },
    {
      title: 'Flexible Cancellation',
      description: 'Free cancellation up to 24 hours before your booking',
      icon: '🔄'
    },
    {
      title: 'Instant Confirmation',
      description: 'Get immediate booking confirmation via email and SMS',
      icon: '⚡'
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-dark-950 to-dark-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Why Choose <span className="gradient-text">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="flex gap-6 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-5xl">{reason.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-gray-400">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
export const CTASection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600" />
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          backgroundSize: '200% 100%',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Book Your Court?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of players who have made their booking experience seamless with our platform
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <motion.button
                className="px-10 py-5 bg-white text-primary-600 font-bold rounded-xl text-lg shadow-2xl"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </motion.button>
            </Link>
            <Link to="/courts">
              <motion.button
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl text-lg border-2 border-white/30"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Courts
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
