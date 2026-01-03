import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
  FiArrowRight,
  FiUser,
  FiShield,
  FiZap
} from 'react-icons/fi';
import { SiGoogle, SiFacebook, SiApple } from 'react-icons/si';
import PublicBackground from '../../components/layout/PublicBackground';
import AuthPageWrapper from './AuthPageWrapper';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Login:', formData);
        setIsLoading(false);
        // Redirect to user dashboard after successful login
        navigate('/dashboard/user');
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <PublicBackground variant="gradient" />

      {/* Main Content Container */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Logo */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <FiZap className="text-3xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text-animated">CourtBooker</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Indoor Sports Booking</p>
                </div>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
              >
                Welcome Back to Your
                <span className="gradient-text-animated block"> Sports Hub</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 dark:text-gray-400 mb-8"
              >
                Access your bookings, manage your profile, and discover new courts.
              </motion.p>
            </motion.div>

            {/* Feature List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {[
                { icon: FiCheck, text: 'Easy booking management', color: 'from-green-500 to-emerald-600' },
                { icon: FiShield, text: 'Secure payment processing', color: 'from-blue-500 to-cyan-600' },
                { icon: FiUser, text: 'Personalized experience', color: 'from-purple-500 to-pink-600' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-8 lg:p-12 shadow-2xl">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h2>
                  <p className="text-gray-600 dark:text-gray-400">Login to your account to continue</p>
                </motion.div>

                {/* Social Login */}
                <motion.div variants={itemVariants} className="space-y-3 mb-6">
                  <button
                    onClick={() => handleSocialLogin('google')}
                    className="w-full p-4 flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <SiGoogle className="text-xl text-red-500" />
                    Continue with Google
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleSocialLogin('facebook')}
                      className="p-4 flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-semibold text-gray-700 dark:text-gray-300"
                    >
                      <SiFacebook className="text-xl text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleSocialLogin('apple')}
                      className="p-4 flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all font-semibold text-gray-700 dark:text-gray-300"
                    >
                      <SiApple className="text-xl text-gray-900 dark:text-white" />
                    </button>
                  </div>
                </motion.div>

                {/* Divider */}
                <motion.div variants={itemVariants} className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">Or continue with email</span>
                  </div>
                </motion.div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-900 ${
                          errors.email
                            ? 'border-red-500 dark:border-red-500'
                            : focusedField === 'email'
                            ? 'border-primary-500 dark:border-primary-400 ring-4 ring-primary-100 dark:ring-primary-900/50'
                            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs"
                        >
                          <FiAlertCircle />
                          {errors.email}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all outline-none text-gray-900 dark:text-white bg-white dark:bg-gray-900 ${
                          errors.password
                            ? 'border-red-500 dark:border-red-500'
                            : focusedField === 'password'
                            ? 'border-primary-500 dark:border-primary-400 ring-4 ring-primary-100 dark:ring-primary-900/50'
                            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                      </button>
                      {errors.password && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs"
                        >
                          <FiAlertCircle />
                          {errors.password}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Remember Me & Forgot Password */}
                  <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 dark:bg-gray-800"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Remember me</span>
                    </label>
                    <Link
                      to="/auth/forgot-password"
                      className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <FiArrowRight />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Sign Up Link */}
                <motion.div variants={itemVariants} className="mt-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link
                      to="/auth/register"
                      className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      Sign up for free
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
