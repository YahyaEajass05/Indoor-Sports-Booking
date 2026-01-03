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
import { Button } from '../../components/common/Button';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for interactive background
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Login:', formData);
      setIsLoading(false);
      // Navigate to dashboard
      navigate('/dashboard/user');
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    console.log('Social login:', provider);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard/user');
    }, 1500);
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

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Shapes */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-full blur-3xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
      />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center space-y-8"
        >
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FiZap className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">CourtBooker</h1>
                <p className="text-sm text-gray-600">Indoor Sports Booking</p>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-5xl font-bold text-gray-900 mb-4 leading-tight"
            >
              Welcome Back to Your
              <span className="gradient-text"> Sports Hub</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8"
            >
              Access your bookings, manage your profile, and discover new courts.
            </motion.p>
          </div>

          {/* Feature List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {[
              { icon: FiCheck, text: 'Easy booking management' },
              { icon: FiShield, text: 'Secure payment processing' },
              { icon: FiUser, text: 'Personalized experience' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 glass rounded-2xl border border-gray-200/50"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <feature.icon className="text-2xl text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl border border-gray-200/50 p-8 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-400/10 to-purple-400/10 rounded-full blur-3xl -z-10" />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">Login to your account to continue</p>
            </motion.div>

            {/* Social Login */}
            <motion.div variants={itemVariants} className="space-y-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialLogin('google')}
                className="w-full p-4 flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all font-semibold text-gray-700"
              >
                <SiGoogle className="text-xl text-red-500" />
                Continue with Google
              </motion.button>
              
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialLogin('facebook')}
                  className="p-4 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all font-semibold text-gray-700"
                >
                  <SiFacebook className="text-xl text-blue-600" />
                  Facebook
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialLogin('apple')}
                  className="p-4 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold text-gray-700"
                >
                  <SiApple className="text-xl text-gray-900" />
                  Apple
                </motion.button>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
              </div>
            </motion.div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    animate={{
                      scale: focusedField === 'email' ? 1.02 : 1,
                      borderColor: focusedField === 'email' ? 'rgb(59, 130, 246)' : errors.email ? 'rgb(239, 68, 68)' : 'rgb(229, 231, 235)'
                    }}
                    className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <FiAlertCircle /> {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <motion.input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    animate={{
                      scale: focusedField === 'password' ? 1.02 : 1,
                      borderColor: focusedField === 'password' ? 'rgb(59, 130, 246)' : errors.password ? 'rgb(239, 68, 68)' : 'rgb(229, 231, 235)'
                    }}
                    className="w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:outline-none transition-all"
                    placeholder="Enter your password"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                  </motion.button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <FiAlertCircle /> {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Remember me</span>
                </label>
                
                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight className="text-xl" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Sign Up Link */}
            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/auth/register"
                  className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Sign up for free
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
