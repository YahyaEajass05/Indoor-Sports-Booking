import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Users, Award, Heart, Zap, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <StatsSection />
    </div>
  );
};

const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative py-32 bg-gradient-to-br from-primary-900 via-dark-800 to-secondary-900 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            About <span className="gradient-text">Our Mission</span>
          </h1>
          <p className="text-2xl text-gray-300">Revolutionizing sports booking with technology and passion</p>
        </motion.div>
      </div>
    </section>
  );
};

const MissionSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              We believe everyone should have easy access to quality sports facilities. 
              Our platform connects sports enthusiasts with premium courts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800"
                alt="Mission"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ValuesSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const values = [
    { icon: Target, title: 'Excellence', description: 'We strive for excellence in every aspect', color: 'from-blue-400 to-cyan-500' },
    { icon: Heart, title: 'Customer First', description: 'Your satisfaction is our priority', color: 'from-pink-400 to-red-500' },
    { icon: Zap, title: 'Innovation', description: 'Constantly improving and adopting new tech', color: 'from-yellow-400 to-orange-500' },
    { icon: Shield, title: 'Trust', description: 'Your data and payments are secure', color: 'from-green-400 to-emerald-500' }
  ];

  return (
    <section className="py-32 bg-dark-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <h2 className="text-5xl font-bold text-white mb-6">Our <span className="gradient-text">Values</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}
                whileHover={{ rotate: 360 }}
              >
                <value.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const team = [
    { name: 'John Smith', role: 'CEO & Founder', image: 'https://i.pravatar.cc/300?img=12' },
    { name: 'Sarah Johnson', role: 'CTO', image: 'https://i.pravatar.cc/300?img=45' },
    { name: 'Mike Chen', role: 'Head of Operations', image: 'https://i.pravatar.cc/300?img=33' },
    { name: 'Emily Davis', role: 'Head of Marketing', image: 'https://i.pravatar.cc/300?img=47' }
  ];

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <h2 className="text-5xl font-bold text-white mb-6">Meet Our <span className="gradient-text">Team</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="rounded-2xl overflow-hidden">
                <motion.img src={member.image} alt={member.name} className="w-full aspect-square object-cover" whileHover={{ scale: 1.1 }} />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-primary-400">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '500+', label: 'Partner Venues' },
    { value: '100K+', label: 'Bookings' },
    { value: '15+', label: 'Cities' }
  ];

  return (
    <section className="py-32 bg-gradient-to-r from-primary-600 to-secondary-600" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-6xl font-bold text-white mb-2">{stat.value}</div>
              <p className="text-xl text-white/90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
