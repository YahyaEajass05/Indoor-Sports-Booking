const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * User Model Schema
 * Features:
 * - Role-based access (admin, owner, user)
 * - Email verification
 * - Password reset tokens
 * - Profile management
 * - Security features
 * - Audit trail
 * - Virtual fields
 * - Instance methods
 */

const userSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  
  // Role & Status
  role: {
    type: String,
    enum: ['user', 'owner', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  // Profile Information
  phone: {
    type: String,
    match: [/^[\d\s\-\+\(\)]+$/, 'Please provide a valid phone number']
  },
  avatar: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=User&background=random'
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'USA'
    }
  },
  
  // Owner Specific Fields
  ownerProfile: {
    businessName: String,
    businessLicense: String,
    taxId: String,
    verified: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date,
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  
  // Security & Verification
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  passwordChangedAt: Date,
  
  // Two-Factor Authentication
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: String,
  
  // Preferences
  preferences: {
    newsletter: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'America/New_York'
    }
  },
  
  // Statistics
  stats: {
    totalBookings: {
      type: Number,
      default: 0
    },
    completedBookings: {
      type: Number,
      default: 0
    },
    cancelledBookings: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    lastBookingDate: Date
  },
  
  // Social Login
  socialAuth: {
    googleId: String,
    facebookId: String,
    appleId: String
  },
  
  // Security & Audit
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  ipAddress: String,
  userAgent: String,
  
  // Soft Delete
  deletedAt: Date,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

/**
 * ═══════════════════════════════════════════
 * INDEXES
 * ═══════════════════════════════════════════
 */
userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ 'ownerProfile.verified': 1 });

/**
 * ═══════════════════════════════════════════
 * VIRTUAL FIELDS
 * ═══════════════════════════════════════════
 */

// Full address
userSchema.virtual('fullAddress').get(function() {
  if (!this.address) return null;
  const { street, city, state, zipCode, country } = this.address;
  return `${street || ''}, ${city || ''}, ${state || ''} ${zipCode || ''}, ${country || ''}`.trim();
});

// Account age in days
userSchema.virtual('accountAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Is account locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

/**
 * ═══════════════════════════════════════════
 * MIDDLEWARE (PRE HOOKS)
 * ═══════════════════════════════════════════
 */

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
    
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    
    // Set password changed timestamp
    if (!this.isNew) {
      this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second for token timing
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Set default avatar if not provided
userSchema.pre('save', function(next) {
  if (!this.avatar && this.name) {
    this.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=random&size=200`;
  }
  next();
});

/**
 * ═══════════════════════════════════════════
 * INSTANCE METHODS
 * ═══════════════════════════════════════════
 */

/**
 * Compare password
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

/**
 * Generate JWT token
 */
userSchema.methods.generateAuthToken = function() {
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

/**
 * Generate refresh token
 */
userSchema.methods.generateRefreshToken = function() {
  const payload = {
    id: this._id,
    type: 'refresh'
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' }
  );
};

/**
 * Generate email verification token
 */
userSchema.methods.generateEmailVerificationToken = function() {
  // Generate token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  // Hash and set to user
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  // Set expire time (24 hours)
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;
  
  return verificationToken;
};

/**
 * Generate password reset token
 */
userSchema.methods.generatePasswordResetToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash and set to user
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Set expire time (1 hour)
  this.passwordResetExpire = Date.now() + 60 * 60 * 1000;
  
  return resetToken;
};

/**
 * Check if password was changed after token was issued
 */
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

/**
 * Increment login attempts
 */
userSchema.methods.incrementLoginAttempts = async function() {
  // Reset attempts if lock has expired
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return await this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  // Increment attempts
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts
  if (this.loginAttempts + 1 >= 5 && !this.lockUntil) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return await this.updateOne(updates);
};

/**
 * Reset login attempts
 */
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

/**
 * Update last login
 */
userSchema.methods.updateLastLogin = function(ipAddress, userAgent) {
  this.lastLogin = Date.now();
  this.ipAddress = ipAddress;
  this.userAgent = userAgent;
  return this.save({ validateBeforeSave: false });
};

/**
 * Soft delete user
 */
userSchema.methods.softDelete = function(deletedById) {
  this.deletedAt = Date.now();
  this.deletedBy = deletedById;
  this.isActive = false;
  return this.save({ validateBeforeSave: false });
};

/**
 * Get safe user object (without sensitive data)
 */
userSchema.methods.toSafeObject = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.emailVerificationToken;
  delete obj.emailVerificationExpire;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpire;
  delete obj.twoFactorSecret;
  delete obj.socialAuth;
  delete obj.loginAttempts;
  delete obj.lockUntil;
  delete obj.__v;
  return obj;
};

/**
 * ═══════════════════════════════════════════
 * STATIC METHODS
 * ═══════════════════════════════════════════
 */

/**
 * Find user by email with password
 */
userSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email, isActive: true }).select('+password');
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check if account is locked
  if (user.isLocked) {
    throw new Error('Account is temporarily locked. Please try again later.');
  }
  
  // Compare password
  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    await user.incrementLoginAttempts();
    throw new Error('Invalid credentials');
  }
  
  // Reset login attempts on successful login
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }
  
  return user;
};

/**
 * Get user statistics
 */
userSchema.statics.getUserStatistics = async function() {
  const stats = await this.aggregate([
    {
      $match: { deletedAt: { $exists: false } }
    },
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        active: {
          $sum: { $cond: ['$isActive', 1, 0] }
        },
        verified: {
          $sum: { $cond: ['$isEmailVerified', 1, 0] }
        }
      }
    }
  ]);
  
  return stats;
};

/**
 * ═══════════════════════════════════════════
 * QUERY HELPERS
 * ═══════════════════════════════════════════
 */

// Exclude soft deleted users
userSchema.query.notDeleted = function() {
  return this.where({ deletedAt: { $exists: false } });
};

// Get active users only
userSchema.query.active = function() {
  return this.where({ isActive: true, deletedAt: { $exists: false } });
};

// Get verified users only
userSchema.query.verified = function() {
  return this.where({ isEmailVerified: true });
};

// Get users by role
userSchema.query.byRole = function(role) {
  return this.where({ role });
};

module.exports = mongoose.model('User', userSchema);
