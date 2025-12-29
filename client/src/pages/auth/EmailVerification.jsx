import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  FiMail,
  FiCheck,
  FiAlertCircle,
  FiRefreshCw,
  FiArrowRight,
  FiClock,
  FiShield,
  FiCheckCircle
} from 'react-icons/fi';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'user@example.com';

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value.slice(-1);
    setVerificationCode(newCode);
    setError('');

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }

    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setVerificationCode(newCode);

    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (code) => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (code === '123456') {
        setIsVerified(true);
        setIsLoading(false);
        setTimeout(() => navigate('/auth/login'), 3000);
      } else {
        setError('Invalid verification code. Please try again.');
        setIsLoading(false);
        setVerificationCode(['', '', '', '', '', '']);
        document.getElementById('code-0')?.focus();
      }
    }, 2000);
  };

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(60);
    setCanResend(false);
    setError('');
    console.log('Resending verification email to:', email);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`
        }}
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
      />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl border border-gray-200/50 p-8 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {!isVerified ? (
                <motion.div
                  key="verification"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div variants={itemVariants} className="text-center mb-8">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-lg"
                    >
                      <FiMail className="text-4xl text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                    <p className="text-gray-600 mb-4">
                      We've sent a verification code to
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
                      <FiMail className="text-purple-600" />
                      <span className="font-semibold text-gray-900">{email}</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                      Enter 6-Digit Code
                    </label>
                    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                      {verificationCode.map((digit, index) => (
                        <motion.input
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleCodeChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          whileFocus={{ scale: 1.1, borderColor: 'rgb(168, 85, 247)' }}
                          className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all"
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-sm text-red-600 flex items-center justify-center gap-1"
                      >
                        <FiAlertCircle /> {error}
                      </motion.p>
                    )}
                  </motion.div>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-6"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
                      />
                      <p className="text-sm text-gray-600 mt-2">Verifying...</p>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants} className="text-center mb-8">
                    <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
                    <motion.button
                      onClick={handleResend}
                      disabled={!canResend}
                      whileHover={{ scale: canResend ? 1.05 : 1 }}
                      whileTap={{ scale: canResend ? 0.95 : 1 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiRefreshCw className={!canResend ? 'animate-spin' : ''} />
                      {canResend ? (
                        'Resend Code'
                      ) : (
                        <>
                          <FiClock className="text-sm" />
                          Resend in {countdown}s
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="p-4 bg-purple-50 border border-purple-200 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <FiShield className="text-purple-600 text-xl flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-purple-900 mb-1">Why verify?</p>
                        <p className="text-xs text-purple-700">
                          Email verification helps us ensure account security and enables password recovery.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Wrong email?{' '}
                      <Link to="/auth/register" className="font-semibold text-purple-600 hover:text-purple-700">
                        Go back
                      </Link>
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15
                    }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg"
                  >
                    <FiCheckCircle className="text-5xl text-white" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    Email Verified!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 mb-2"
                  >
                    Your email has been successfully verified.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-gray-500 mb-8"
                  >
                    Redirecting to login...
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-xl">
                      <FiCheck className="text-green-600 text-xl" />
                      <span className="text-sm font-semibold text-green-900">Account activated</span>
                    </div>

                    <Link
                      to="/auth/login"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Continue to Login
                      <FiArrowRight />
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link to="/contact" className="font-semibold text-purple-600 hover:text-purple-700">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerification;
