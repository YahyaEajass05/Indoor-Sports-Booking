import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { toast } from 'sonner';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      <HeroSection />
      <ContactFormSection />
      <ContactInfoSection />
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
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-2xl text-gray-300">We'd love to hear from you!</p>
        </motion.div>
      </div>
    </section>
  );
};

const ContactFormSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="bg-dark-800 rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                placeholder="How can we help?"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Message</label>
              <textarea
                required
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold rounded-xl flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Sending...' : <><Send className="w-5 h-5" /> Send Message</>}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const ContactInfoSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const contacts = [
    { icon: Mail, title: 'Email', value: 'support@courtbooking.com', color: 'from-blue-400 to-cyan-500' },
    { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567', color: 'from-green-400 to-emerald-500' },
    { icon: MapPin, title: 'Address', value: '123 Sports Ave, NY 10001', color: 'from-purple-400 to-pink-500' },
    { icon: Clock, title: 'Hours', value: '24/7 Available', color: 'from-orange-400 to-red-500' }
  ];

  return (
    <section className="py-32 bg-dark-900" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center mx-auto mb-4`}
                whileHover={{ rotate: 360 }}
              >
                <contact.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">{contact.title}</h3>
              <p className="text-primary-400">{contact.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
