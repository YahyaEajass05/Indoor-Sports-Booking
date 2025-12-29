import { motion } from 'framer-motion';
import { FiShield, FiLock, FiInfo } from 'react-icons/fi';
import PublicBackground from '../../components/layout/PublicBackground';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, make a booking, or contact us. This includes your name, email, phone number, payment information, and booking preferences.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process your bookings, send you confirmations and updates, respond to your requests, and personalize your experience.'
    },
    {
      title: '3. Information Sharing',
      content: 'We do not sell your personal information. We may share your information with venue owners for booking purposes, with service providers who help us operate our platform, and when required by law.'
    },
    {
      title: '4. Data Security',
      content: 'We implement appropriate security measures to protect your information. All payment information is encrypted using SSL technology. However, no method of transmission over the Internet is 100% secure.'
    },
    {
      title: '5. Cookies and Tracking',
      content: 'We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookies through your browser settings.'
    },
    {
      title: '6. Your Rights',
      content: 'You have the right to access, update, or delete your personal information. You can also object to processing, request data portability, and withdraw consent at any time by contacting us.'
    },
    {
      title: '7. Data Retention',
      content: 'We retain your information for as long as your account is active or as needed to provide services. We may also retain certain information as required by law or for legitimate business purposes.'
    },
    {
      title: '8. Changes to Privacy Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.'
    }
  ];

  return (
    <div className="relative min-h-screen">
      <PublicBackground variant="purple" />

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
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6"
            >
              <FiShield className="text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">Your Privacy Matters</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy <span className="gradient-text">Policy</span>
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
            className="glass rounded-2xl border border-green-200/50 p-8 bg-green-50/50"
          >
            <div className="flex items-start gap-4">
              <FiLock className="text-3xl text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your Data is Safe</h3>
                <p className="text-gray-700 mb-4">
                  We take your privacy seriously and are committed to protecting your personal information. 
                  All data is encrypted and stored securely.
                </p>
                <a
                  href="mailto:privacy@courtbooker.com"
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  privacy@courtbooker.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
