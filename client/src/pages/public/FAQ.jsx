import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      <HeroSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [search, setSearch] = useState('');

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
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8">Find answers to common questions</p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { category: 'General', q: 'How do I create an account?', a: 'Click "Sign Up", fill in your details, and verify your email.' },
    { category: 'General', q: 'Is the platform free?', a: 'Yes, creating an account is free. You only pay when booking.' },
    { category: 'Booking', q: 'How do I book a court?', a: 'Search courts, select time slot, and complete payment.' },
    { category: 'Booking', q: 'Can I book multiple slots?', a: 'Yes, you can book multiple consecutive slots.' },
    { category: 'Payment', q: 'What payment methods?', a: 'We accept cards, UPI, net banking, and wallets.' },
    { category: 'Payment', q: 'Is payment secure?', a: 'Yes, we use bank-level encryption.' },
    { category: 'Cancellation', q: 'Can I cancel?', a: 'Yes, cancel up to 24 hours before for full refund.' },
    { category: 'Cancellation', q: 'When will I get refund?', a: 'Refunds process within 5-7 business days.' }
  ];

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="bg-dark-800 rounded-2xl overflow-hidden border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="text-lg font-semibold text-white">{faq.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown className="w-6 h-6 text-primary-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-400">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
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
          <HelpCircle className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-5xl font-bold text-white mb-6">Still Have Questions?</h2>
          <motion.button
            className="px-12 py-5 bg-white text-primary-600 font-bold rounded-xl text-xl"
            whileHover={{ scale: 1.05 }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
