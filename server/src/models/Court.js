const mongoose = require('mongoose');

/**
 * Court Model Schema
 * Features:
 * - Court information and details
 * - Location with geospatial queries
 * - Pricing with peak/off-peak support
 * - Amenities and facilities
 * - Availability scheduling
 * - Reviews and ratings
 * - Image gallery
 * - Owner management
 */

const courtSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Court name is required'],
    trim: true,
    maxlength: [100, 'Court name cannot exceed 100 characters']
  },
  sport: {
    type: String,
    required: [true, 'Sport type is required'],
    enum: ['basketball', 'tennis', 'badminton', 'volleyball', 'squash', 'futsal', 'table-tennis', 'other'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  // Owner Information
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Location
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'USA'
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere'
      }
    }
  },
  
  // Pricing
  pricing: {
    hourlyRate: {
      type: Number,
      required: [true, 'Hourly rate is required'],
      min: [0, 'Hourly rate cannot be negative']
    },
    peakHourRate: {
      type: Number,
      min: [0, 'Peak hour rate cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    peakHours: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      },
      startTime: String,
      endTime: String
    }],
    minimumBookingHours: {
      type: Number,
      default: 1,
      min: 0.5
    },
    maximumBookingHours: {
      type: Number,
      default: 4
    }
  },
  
  // Amenities
  amenities: [{
    type: String,
    enum: [
      'parking',
      'locker-room',
      'shower',
      'wifi',
      'air-conditioning',
      'lighting',
      'scoreboard',
      'seating',
      'water-fountain',
      'first-aid',
      'equipment-rental',
      'cafe',
      'pro-shop',
      'coaching'
    ]
  }],
  
  // Images
  images: [{
    url: String,
    publicId: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Specifications
  specifications: {
    surfaceType: {
      type: String,
      enum: ['hardwood', 'synthetic', 'concrete', 'grass', 'carpet', 'clay']
    },
    indoor: {
      type: Boolean,
      default: true
    },
    courtSize: String,
    capacity: Number,
    lighting: {
      type: String,
      enum: ['natural', 'artificial', 'both']
    }
  },
  
  // Availability
  availability: {
    monday: { open: String, close: String, closed: { type: Boolean, default: false } },
    tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
    friday: { open: String, close: String, closed: { type: Boolean, default: false } },
    saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
    sunday: { open: String, close: String, closed: { type: Boolean, default: false } }
  },
  
  // Status & Approval
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectionReason: String,
  
  // Reviews & Ratings
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
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
    totalRevenue: {
      type: Number,
      default: 0
    },
    averageBookingDuration: {
      type: Number,
      default: 0
    },
    lastBookingDate: Date
  },
  
  // Features
  featured: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  
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

// Indexes for performance
courtSchema.index({ 'location.coordinates': '2dsphere' });
courtSchema.index({ sport: 1, status: 1 });
courtSchema.index({ owner: 1 });
courtSchema.index({ rating: -1 });
courtSchema.index({ featured: 1, status: 1 });

// Virtual for reviews
courtSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'court'
});

// Query helpers
courtSchema.query.approved = function() {
  return this.where({ status: 'approved', deletedAt: { $exists: false } });
};

courtSchema.query.bySport = function(sport) {
  return this.where({ sport });
};

module.exports = mongoose.model('Court', courtSchema);
