import AuthNavbar from '../../components/layout/AuthNavbar';
import PublicBackground from '../../components/layout/PublicBackground';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiMail,
  FiArrowLeft,
  FiCheck,
  FiAlertCircle,
  FiSend,
  FiRefreshCw,
  FiShield,
  FiClock,
  FiZap
} from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setCountdown(60);
      console.log('Password reset email sent to:', email);
    }, 2000);
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(60);
    console.log('Resending password reset email to:', email);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen">`n      {/* Auth Navbar */}`n      <AuthNavbar />`n`n      {/* Animated Background */}`n      <PublicBackground variant="gradient" />`n
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}
      />

      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          rotate: [0, -90, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
      />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl border border-gray-200/50 p-8 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl -z-10" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Back Button */}
            <motion.div variants={itemVariants} className="mb-8">
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:text-white transition-colors font-medium"
              >
                <FiArrowLeft />
                Back to Login
              </Link>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Header */}
                  <motion.div variants={itemVariants} className="text-center mb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-6 shadow-lg"
                    >
                      <FiShield className="text-4xl text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h2>
                    <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500">
                      No worries! Enter your email and we'll send you reset instructions.
                    </p>
                  </motion.div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
                        <motion.input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                          }}
                          onFocus={() => setFocusedField(true)}
                          onBlur={() => setFocusedField(false)}
                          animate={{
                            scale: focusedField ? 1.02 : 1,
                            borderColor: focusedField
                              ? 'rgb(59, 130, 246)'
                              : error
                              ? 'rgb(239, 68, 68)'
                              : 'rgb(229, 231, 235)'
                          }}
                          className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-2 text-sm text-red-600 flex items-center gap-1"
                          >
                            <FiAlertCircle /> {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FiSend />
                            Send Reset Link
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>

                  {/* Security Note */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <FiShield className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">Security Notice</p>
                        <p className="text-xs text-blue-700">
                          For your security, the reset link will expire in 1 hour. If you don't receive an email,
                          check your spam folder.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-8"
                >
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2
                    }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg"
                  >
                    <FiCheck className="text-5xl text-white" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    Check Your Email!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-6"
                  >
                    We've sent password reset instructions to
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg mb-8"
                  >
                    <FiMail className="text-primary-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">{email}</span>
                  </motion.div>

                  {/* Instructions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4 text-left mb-8"
                  >
                    <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary-600">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Check your inbox</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-500">Look for an email from CourtBooker</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary-600">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Click the reset link</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-500">The link expires in 1 hour</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary-600">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Create new password</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-500">Choose a strong, unique password</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Resend Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-3">Didn't receive the email?</p>
                    <motion.button
                      onClick={handleResend}
                      disabled={countdown > 0}
                      whileHover={{ scale: countdown > 0 ? 1 : 1.02 }}
                      whileTap={{ scale: countdown > 0 ? 1 : 0.98 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiRefreshCw className={countdown > 0 ? 'animate-spin' : ''} />
                      {countdown > 0 ? (
                        <>
                          <FiClock className="text-sm" />
                          Resend in {countdown}s
                        </>
                      ) : (
                        'Resend Email'
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Back to Login */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8"
                  >
                    <Link
                      to="/auth/login"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                    >
                      <FiArrowLeft />
                      Back to Login
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">
            Need help?{' '}
            <Link to="/contact" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
