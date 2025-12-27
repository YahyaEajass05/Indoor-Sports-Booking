import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Calendar, CreditCard, Play, CheckCircle, MapPin, Clock, Shield } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      <HeroSection />
      <StepsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative py-32 bg-gradient-to-br from-primary-900 via-dark-800 to-secondary-900 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            How It <span className="gradient-text">Works</span>
          </h1>
          <p className="text-2xl text-gray-300">Book your perfect court in just 4 simple steps</p>
        </motion.div>
      </div>
    </section>
  );
};

const StepsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    {
      icon: Search, title: 'Search Courts',
      description: 'Browse through hundreds of premium sports courts near you.',
      color: 'from-blue-400 to-cyan-500',
      features: ['Real-time availability', 'Location-based search', 'Advanced filters']
    },
    {
      icon: Calendar, title: 'Select Time Slot',
      description: 'Choose your preferred date and time slot with instant confirmation.',
      color: 'from-purple-400 to-pink-500',
      features: ['Flexible timing', 'Instant confirmation', 'Multiple slots']
    },
    {
      icon: CreditCard, title: 'Make Payment',
      description: 'Complete booking with secure payment options.',
      color: 'from-green-400 to-emerald-500',
      features: ['Secure payments', 'Multiple options', 'Instant receipts']
    },
    {
      icon: Play, title: 'Play & Enjoy',
      description: 'Show up and enjoy your game with digital pass.',
      color: 'from-orange-400 to-red-500',
      features: ['Digital pass', 'Easy check-in', '24/7 support']
    }
  ];

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex-1">
                <motion.div
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <step.icon className="w-12 h-12 text-white" />
                </motion.div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl font-bold text-white/10">0{index + 1}</span>
                  <h3 className="text-4xl font-bold text-white">{step.title}</h3>
                </div>

                <p className="text-xl text-gray-300 mb-6">{step.description}</p>

                <div className="space-y-3">
                  {step.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-primary-400" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className={`aspect-square rounded-2xl bg-gradient-to-br ${step.color} opacity-20`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    { icon: MapPin, title: 'Location Based', desc: 'Find courts near you instantly' },
    { icon: Clock, title: 'Real-time', desc: 'See available slots live' },
    { icon: Shield, title: 'Secure', desc: 'Bank-level security' },
    { icon: CheckCircle, title: 'Instant', desc: 'Get confirmation immediately' }
  ];

  return (
    <section className="py-32 bg-dark-900" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <feature.icon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="py-32 bg-gradient-to-r from-primary-600 to-secondary-600" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
        >
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <motion.button
            className="px-12 py-5 bg-white text-primary-600 font-bold rounded-xl text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Court Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
