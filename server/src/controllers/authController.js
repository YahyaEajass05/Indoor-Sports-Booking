const crypto = require('crypto');
const { asyncHandler } = require('../middleware/errorMiddleware');
const User = require('../models/User');
const { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } = require('../config/mailer');

/**
 * Authentication Controller
 * Handles user authentication, registration, verification, and password management
 */

/**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email, and password');
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  // Validate role
  if (role && !['user', 'owner'].includes(role)) {
    res.status(400);
    throw new Error('Invalid role. Must be "user" or "owner"');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user',
    phone,
  });

  // Generate verification token
  const verificationToken = user.generateEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Send verification email
  if (process.env.ENABLE_EMAIL_VERIFICATION === 'true') {
    try {
      await sendVerificationEmail(user, verificationToken);
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }

  // Generate auth token
  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  // Set cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'User registered successfully. Please verify your email.',
    data: {
      user: user.toSafeObject(),
      token,
      refreshToken,
    },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  // Find user and include password
  const user = await User.findByCredentials(email, password);

  // Update last login
  await user.updateLastLogin(req.ip, req.get('user-agent'));

  // Generate tokens
  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  // Set cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  res.cookie('token', token, cookieOptions);

  res.json({
    success: true,
    message: 'Logged in successfully',
    data: {
      user: user.toSafeObject(),
      token,
      refreshToken,
    },
  });
});

/**
 * @desc    Logout user
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    success: true,
    data: user.toSafeObject(),
  });
});

/**
 * @desc    Verify email
 * @route   POST /api/v1/auth/verify-email/:token
 * @access  Public
 */
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    res.status(400);
    throw new Error('Verification token is required');
  }

  // Hash token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find user with valid token
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired verification token');
  }

  // Update user
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;
  await user.save({ validateBeforeSave: false });

  // Send welcome email
  try {
    await sendWelcomeEmail(user);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }

  res.json({
    success: true,
    message: 'Email verified successfully',
  });
});

/**
 * @desc    Resend verification email
 * @route   POST /api/v1/auth/resend-verification
 * @access  Private
 */
const resendVerification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.isEmailVerified) {
    res.status(400);
    throw new Error('Email is already verified');
  }

  // Generate new token
  const verificationToken = user.generateEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Send email
  await sendVerificationEmail(user, verificationToken);

  res.json({
    success: true,
    message: 'Verification email sent successfully',
  });
});

/**
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Please provide email address');
  }

  const user = await User.findOne({ email });

  if (!user) {
    // Don't reveal if user exists
    res.json({
      success: true,
      message: 'If that email exists, a password reset link has been sent',
    });
    return;
  }

  // Generate reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send email
  try {
    await sendPasswordResetEmail(user, resetToken);
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error('Error sending password reset email');
  }

  res.json({
    success: true,
    message: 'If that email exists, a password reset link has been sent',
  });
});

/**
 * @desc    Reset password
 * @route   PUT /api/v1/auth/reset-password/:token
 * @access  Public
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error('Please provide new password');
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }

  // Hash token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find user
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired reset token');
  }

  // Update password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  // Generate new token
  const authToken = user.generateAuthToken();

  res.json({
    success: true,
    message: 'Password reset successful',
    data: {
      token: authToken,
    },
  });
});

/**
 * @desc    Refresh token
 * @route   POST /api/v1/auth/refresh-token
 * @access  Public
 */
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    res.status(400);
    throw new Error('Refresh token is required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      res.status(401);
      throw new Error('Invalid refresh token');
    }

    const newToken = user.generateAuthToken();
    const newRefreshToken = user.generateRefreshToken();

    res.json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    res.status(401);
    throw new Error('Invalid or expired refresh token');
  }
});

/**
 * @desc    Update password
 * @route   PUT /api/v1/auth/update-password
 * @access  Private
 */
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error('Please provide current and new password');
  }

  // Get user with password
  const user = await User.findById(req.user._id).select('+password');

  // Check current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  // Generate new token
  const token = user.generateAuthToken();

  res.json({
    success: true,
    message: 'Password updated successfully',
    data: { token },
  });
});

module.exports = {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  refreshToken,
  updatePassword,
};
