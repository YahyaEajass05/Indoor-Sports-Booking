import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      <section className="relative py-32 bg-gradient-to-br from-primary-900 via-dark-800 to-secondary-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-300">Last updated: January 2024</p>
          </motion.div>
        </div>
      </section>

      <section className="py-32" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="bg-dark-800 rounded-2xl p-8 border border-white/10 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">1. Information We Collect</h2>
                <p className="text-gray-300">We collect personal information including name, email, phone number, and payment details when you create an account and make bookings.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-300">Your information is used to process bookings, send confirmations, provide customer support, and improve our services.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">3. Data Security</h2>
                <p className="text-gray-300">We implement industry-standard security measures to protect your data. All payment information is encrypted and processed through secure payment gateways.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">4. Information Sharing</h2>
                <p className="text-gray-300">We do not sell your personal information. We may share necessary booking details with venue partners to fulfill your reservations.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">5. Cookies</h2>
                <p className="text-gray-300">We use cookies to enhance user experience, analyze site traffic, and personalize content. You can control cookie preferences in your browser.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">6. Your Rights</h2>
                <p className="text-gray-300">You have the right to access, update, or delete your personal information. Contact us to exercise these rights.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">7. Third-Party Links</h2>
                <p className="text-gray-300">Our platform may contain links to third-party websites. We are not responsible for their privacy practices.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">8. Changes to Policy</h2>
                <p className="text-gray-300">We may update this privacy policy periodically. We will notify users of significant changes via email.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">9. Contact Us</h2>
                <p className="text-gray-300">For privacy-related questions, contact us at privacy@courtbooking.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
