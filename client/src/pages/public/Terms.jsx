import { motion } from 'framer-motion';
import { FiFileText, FiShield, FiInfo } from 'react-icons/fi';
import PublicBackground from '../../components/layout/PublicBackground';

const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using CourtBooker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.'
    },
    {
      title: '2. Use of Service',
      content: 'You agree to use our service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.'
    },
    {
      title: '3. Booking and Payments',
      content: 'All bookings are subject to availability and confirmation. Payment must be made at the time of booking. We accept various payment methods as displayed on our platform. All payments are processed securely.'
    },
    {
      title: '4. Cancellation Policy',
      content: 'Cancellations made 24 hours or more before the booking time are eligible for a full refund. Cancellations within 24 hours are subject to a 50% cancellation fee. No-shows are non-refundable.'
    },
    {
      title: '5. User Responsibilities',
      content: 'Users are responsible for arriving on time for their bookings. You must respect venue rules and regulations. Any damage to facilities may result in additional charges and account suspension.'
    },
    {
      title: '6. Liability',
      content: 'CourtBooker acts as a booking platform and is not responsible for the quality of services provided by venue owners. We are not liable for any injuries or damages that occur at the facilities.'
    },
    {
      title: '7. Modifications',
      content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the service after changes constitutes acceptance of the modified terms.'
    },
    {
      title: '8. Contact Information',
      content: 'For questions about these Terms, please contact us at legal@courtbooker.com or call +1 (234) 567-890.'
    }
  ];

  return (
    <div className="relative min-h-screen">
      <PublicBackground variant="default" />

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
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
              <FiFileText className="text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Legal Information</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: December 29, 2025
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl border border-gray-200/50 p-12 mb-8"
          >
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl border border-primary-200/50 p-8 bg-primary-50/50"
          >
            <div className="flex items-start gap-4">
              <FiInfo className="text-3xl text-primary-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Need Clarification?</h3>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our Terms of Service, please don't hesitate to contact our legal team.
                </p>
                <a
                  href="mailto:legal@courtbooker.com"
                  className="text-primary-600 font-semibold hover:text-primary-700"
                >
                  legal@courtbooker.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
