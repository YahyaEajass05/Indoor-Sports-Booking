import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText } from 'lucide-react';

const Terms = () => {
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
            <FileText className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-white mb-6">Terms & Conditions</h1>
            <p className="text-xl text-gray-300">Last updated: January 2024</p>
          </motion.div>
        </div>
      </section>

      <section className="py-32" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto prose prose-invert"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="bg-dark-800 rounded-2xl p-8 border border-white/10 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300">By accessing and using this platform, you accept and agree to be bound by these terms and conditions.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">2. User Accounts</h2>
                <p className="text-gray-300">You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities under your account.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">3. Booking Policy</h2>
                <p className="text-gray-300">All bookings are subject to availability. Payment must be completed to confirm your booking. Cancellations must be made at least 24 hours in advance for a full refund.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">4. Payment Terms</h2>
                <p className="text-gray-300">All payments are processed securely. We accept major credit cards, debit cards, and other payment methods as displayed. Prices are subject to change without notice.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">5. Cancellation & Refunds</h2>
                <p className="text-gray-300">Cancellations made 24+ hours before booking time receive full refund. Cancellations within 24 hours are non-refundable unless the venue is unavailable.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">6. User Conduct</h2>
                <p className="text-gray-300">Users must behave respectfully at all venues. Any damage to property or disruptive behavior may result in account suspension and legal action.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-300">We are not liable for any injuries or damages that occur at venue premises. Users participate in activities at their own risk.</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">8. Changes to Terms</h2>
                <p className="text-gray-300">We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
