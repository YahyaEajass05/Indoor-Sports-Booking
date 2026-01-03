import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiAlertCircle,
  FiArrowRight,
  FiShield,
  FiZap,
  FiCheckCircle
} from 'react-icons/fi';
import { SiGoogle, SiFacebook, SiApple } from 'react-icons/si';
import { Button } from '../../components/common/Button';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    termsAccepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const totalSteps = 3;

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

  // Calculate password strength
  useEffect(() => {
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (password.length >= 12) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      if (/[^a-zA-Z\d]/.test(password)) strength++;
      return strength;
    };
    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+?[\d\s-()]+$/.test(phone);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Invalid phone format';
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 3) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log('Register:', formData);
      setIsLoading(false);
      navigate('/auth/email-verification');
    }, 2000);
  };

  const handleSocialRegister = (provider) => {
    console.log('Social register:', provider);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard/user');
    }, 1500);
  };

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  // Animation variants
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

  const stepVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
        }}
      />

      {/* Floating Shapes */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
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
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FiZap className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">CourtBooker</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">Indoor Sports Booking</p>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              Join Thousands of
              <span className="gradient-text"> Sports Enthusiasts</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-8"
            >
              Create your account and start booking courts in minutes.
            </motion.p>
          </div>

          {/* Progress Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {[
              { step: 1, title: 'Personal Info', icon: FiUser },
              { step: 2, title: 'Security', icon: FiShield },
              { step: 3, title: 'Complete', icon: FiCheck }
            ].map((item) => {
              const Icon = item.icon;
              const isCompleted = currentStep > item.step;
              const isCurrent = currentStep === item.step;

              return (
                <motion.div
                  key={item.step}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className={`flex items-center gap-4 p-4 glass rounded-2xl border transition-all ${
                    isCurrent
                      ? 'border-primary-300 bg-primary-50'
                      : isCompleted
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCurrent
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                      : isCompleted
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : 'bg-gray-200'
                  }`}>
                    {isCompleted ? (
                      <FiCheckCircle className="text-2xl text-white" />
                    ) : (
                      <Icon className={`text-2xl ${isCurrent ? 'text-white' : 'text-gray-500 dark:text-gray-400 dark:text-gray-500'}`} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">Step {item.step}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl border border-gray-200/50 p-8 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500">Step {currentStep} of {totalSteps}</p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
                />
              </div>
            </motion.div>

            {/* Social Register (Only on Step 1) */}
            {currentStep === 1 && (
              <motion.div variants={itemVariants} className="space-y-3 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialRegister('google')}
                  className="w-full p-4 flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all font-semibold text-gray-700 dark:text-gray-300"
                >
                  <SiGoogle className="text-xl text-red-500" />
                  Sign up with Google
                </motion.button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 dark:text-gray-500 font-medium">Or sign up with email</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Multi-Step Form */}
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <FiAlertCircle /> {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <FiAlertCircle /> {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <FiAlertCircle /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <FiAlertCircle /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Security */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Create password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>

                      {formData.password && (
                        <div className="mt-3">
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all ${
                                  i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-500">
                            Strength: <span className="font-semibold">{strengthLabels[passwordStrength - 1] || 'Very Weak'}</span>
                          </p>
                        </div>
                      )}
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <FiAlertCircle /> {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                        >
                          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <FiAlertCircle /> {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Address & Terms */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Address</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="123 Main Street"
                        />
                      </div>
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <FiAlertCircle /> {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <FiAlertCircle /> {errors.city}
                        </p>
                      )}
                    </div>

                    <div className="pt-4">
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-primary-600 border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-primary-500 mt-0.5"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          I agree to the{' '}
                          <Link to="/terms" className="font-semibold text-primary-600 hover:text-primary-700">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="font-semibold text-primary-600 hover:text-primary-700">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      {errors.termsAccepted && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <FiAlertCircle /> {errors.termsAccepted}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:bg-gray-900 transition-all"
                  >
                    Back
                  </motion.button>
                )}

                {currentStep < totalSteps ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Next Step
                    <FiArrowRight />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Creating...
                      </>
                    ) : (
                      <>
                        <FiCheck />
                        Create Account
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </form>

            {/* Sign In Link */}
            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500">
                Already have an account?{' '}
                <Link to="/auth/login" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
