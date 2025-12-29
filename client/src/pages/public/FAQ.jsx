import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronDown,
  FiHelpCircle,
  FiSearch,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiBook
} from 'react-icons/fi';
import PublicBackground from '../../components/layout/PublicBackground';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestion, setOpenQuestion] = useState(null);

  const categories = [
    { id: 'all', label: 'All Questions', icon: FiBook },
    { id: 'booking', label: 'Booking', icon: FiHelpCircle },
    { id: 'payment', label: 'Payment', icon: FiHelpCircle },
    { id: 'cancellation', label: 'Cancellation', icon: FiHelpCircle },
    { id: 'account', label: 'Account', icon: FiHelpCircle }
  ];

  const faqs = [
    {
      category: 'booking',
      question: 'How do I book a court?',
      answer: 'Booking a court is simple! Just browse our courts page, select your preferred court, choose a date and time slot, and complete the payment. You\'ll receive instant confirmation via email and SMS.'
    },
    {
      category: 'booking',
      question: 'Can I book a court for multiple days?',
      answer: 'Yes! You can book courts for multiple days or set up recurring bookings. Simply select multiple dates during the booking process or use our recurring booking feature for regular slots.'
    },
    {
      category: 'booking',
      question: 'How far in advance can I book?',
      answer: 'You can book courts up to 90 days in advance. We recommend booking early for popular time slots, especially weekends and evenings.'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital wallets like PayPal, Apple Pay, and Google Pay. All transactions are secured with bank-level encryption.'
    },
    {
      category: 'payment',
      question: 'When will I be charged?',
      answer: 'Payment is processed immediately upon booking confirmation. You\'ll receive a digital receipt via email. For cancellations, refunds are processed according to our cancellation policy.'
    },
    {
      category: 'payment',
      question: 'Are there any hidden fees?',
      answer: 'No! The price you see is the price you pay. We believe in transparent pricing with no hidden charges. Any applicable taxes or service fees are clearly shown before you complete your booking.'
    },
    {
      category: 'cancellation',
      question: 'What is your cancellation policy?',
      answer: 'You can cancel bookings up to 24 hours before your scheduled time for a full refund. Cancellations made within 24 hours are subject to a 50% cancellation fee. No-shows are non-refundable.'
    },
    {
      category: 'cancellation',
      question: 'How do I cancel my booking?',
      answer: 'Log into your account, go to "My Bookings", find the booking you want to cancel, and click the "Cancel" button. You\'ll receive a confirmation email once the cancellation is processed.'
    },
    {
      category: 'cancellation',
      question: 'How long does it take to receive a refund?',
      answer: 'Refunds are typically processed within 5-7 business days and will appear in your original payment method. You\'ll receive an email confirmation once the refund has been initiated.'
    },
    {
      category: 'account',
      question: 'Do I need to create an account to book?',
      answer: 'Yes, creating an account is required for booking. This allows you to manage your bookings, save favorite courts, and access your booking history. Sign up is quick and free!'
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      category: 'account',
      question: 'Can I change my booking details?',
      answer: 'You can modify your booking up to 24 hours before your scheduled time by canceling and rebooking. For last-minute changes, please contact our support team directly.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="relative min-h-screen">
      <PublicBackground variant="gradient" />

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6"
            >
              <FiHelpCircle className="text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Help Center</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our platform
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl border border-gray-200/50 p-4 mb-8"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'glass border border-gray-200/50 text-gray-700 hover:border-primary-300'
                  }`}
                >
                  <Icon />
                  {category.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-16"
          >
            <AnimatePresence>
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl border border-gray-200/50 overflow-hidden"
                >
                  <motion.button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 text-lg pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openQuestion === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="text-2xl text-primary-600 flex-shrink-0" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openQuestion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-16 rounded-2xl border border-gray-200/50 text-center"
            >
              <FiHelpCircle className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or category filter</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl border border-gray-200/50 p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still have <span className="gradient-text">questions?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Can't find the answer you're looking for? Our support team is here to help!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/50 rounded-xl border border-gray-200 cursor-pointer"
                >
                  <FiMessageCircle className="text-4xl text-primary-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-sm text-gray-600">Chat with our support team</p>
                </motion.div>
              </Link>

              <a href="mailto:support@courtbooker.com">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/50 rounded-xl border border-gray-200 cursor-pointer"
                >
                  <FiMail className="text-4xl text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-sm text-gray-600">support@courtbooker.com</p>
                </motion.div>
              </a>

              <a href="tel:+1234567890">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/50 rounded-xl border border-gray-200 cursor-pointer"
                >
                  <FiPhone className="text-4xl text-purple-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-sm text-gray-600">+1 (234) 567-890</p>
                </motion.div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
