import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Star, TrendingUp, Shield, Zap, Users, Clock, Award,
  ChevronRight, Play, CheckCircle2, Sparkles, Target, Heart, ArrowRight,
  Trophy, Flame, Timer, DollarSign, Phone, Mail, MessageSquare
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { toast } from 'sonner';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative overflow-hidden bg-dark-950">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 z-50 origin-left"
        style={{ scaleX: scaleProgress }}
      />

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PopularCourtsSection />
      <StatsSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <CTASection />
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20" ref={ref}>
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              #1 Indoor Sports Booking Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Book Your Perfect
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 animate-gradient-x">
              Court Experience
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover and book premium indoor sports courts instantly. 
            From basketball to badminton, your next game is just a click away.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/courts">
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/50 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Courts
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <motion.button
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center pt-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Calendar, text: 'Instant Booking' },
              { icon: Shield, text: 'Secure Payments' },
              { icon: Clock, text: '24/7 Support' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white"
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book your favorite court in seconds with real-time availability',
      color: 'from-yellow-400 to-orange-500',
      gradient: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-level security',
      color: 'from-green-400 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
    },
    {
      icon: MapPin,
      title: 'Location Based',
      description: 'Find courts near you with smart location search',
      color: 'from-blue-400 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Star,
      title: 'Premium Courts',
      description: 'Access to top-rated and verified sports facilities',
      color: 'from-purple-400 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Users,
      title: 'Group Booking',
      description: 'Book for your team with group discounts',
      color: 'from-indigo-400 to-blue-500',
      gradient: 'bg-gradient-to-br from-indigo-500/20 to-blue-500/20'
    },
    {
      icon: Trophy,
      title: 'Rewards Program',
      description: 'Earn points and get exclusive benefits',
      color: 'from-amber-400 to-yellow-500',
      gradient: 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20'
    }
  ];

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Why Choose <span className="gradient-text">Our Platform</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of sports booking with our cutting-edge features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={`relative p-8 rounded-2xl ${feature.gradient} backdrop-blur-sm border border-white/10 h-full overflow-hidden`}>
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>

                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    { icon: MapPin, title: 'Find Courts', desc: 'Search for courts near you' },
    { icon: Calendar, title: 'Select Time', desc: 'Choose your preferred slot' },
    { icon: DollarSign, title: 'Make Payment', desc: 'Secure online payment' },
    { icon: CheckCircle2, title: 'Play!', desc: 'Enjoy your game' }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 dots-bg opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-400">Simple steps to book your court</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="text-center">
                <motion.div
                  className="relative mx-auto w-32 h-32 mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur-xl opacity-50" />
                  <div className="relative w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-dark-900 font-bold text-sm">
                    {index + 1}
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent -ml-4">
                  <motion.div
                    className="w-4 h-4 bg-primary-500 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Import remaining components
import { 
  PopularCourtsSection, 
  StatsSection, 
  TestimonialsSection, 
  WhyChooseUsSection, 
  CTASection 
} from './HomeComponents';

export { 
  PopularCourtsSection, 
  StatsSection, 
  TestimonialsSection, 
  WhyChooseUsSection, 
  CTASection 
};

export default Home;
