const express = require('express');
const router = express.Router();
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const Court = require('../models/Court');
const { asyncHandler } = require('../middleware/errorMiddleware');

/**
 * Court Routes - Public access for browsing courts
 */

/**
 * @desc    Get all approved courts
 * @route   GET /api/v1/courts
 * @access  Public
 */
router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sport, city, search, minPrice, maxPrice, sortBy = 'createdAt' } = req.query;

  const query = { 
    status: 'approved', 
    deletedAt: { $exists: false } 
  };

  if (sport) query.sport = sport;
  if (city) query['location.city'] = new RegExp(city, 'i');
  if (search) {
    query.$or = [
      { name: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') }
    ];
  }
  if (minPrice || maxPrice) {
    query['pricing.hourlyRate'] = {};
    if (minPrice) query['pricing.hourlyRate'].$gte = parseFloat(minPrice);
    if (maxPrice) query['pricing.hourlyRate'].$lte = parseFloat(maxPrice);
  }

  const sortOptions = {
    createdAt: { createdAt: -1 },
    rating: { rating: -1 },
    price_low: { 'pricing.hourlyRate': 1 },
    price_high: { 'pricing.hourlyRate': -1 },
    popular: { 'stats.totalBookings': -1 }
  };

  const courts = await Court.find(query)
    .populate('owner', 'name ownerProfile.businessName ownerProfile.rating')
    .sort(sortOptions[sortBy] || { createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .lean();

  const count = await Court.countDocuments(query);

  res.json({
    success: true,
    data: courts,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
}));

/**
 * @desc    Get court by ID
 * @route   GET /api/v1/courts/:id
 * @access  Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const court = await Court.findById(req.params.id)
    .populate('owner', 'name email phone ownerProfile');

  if (!court || court.deletedAt || court.status !== 'approved') {
    res.status(404);
    throw new Error('Court not found');
  }

  res.json({
    success: true,
    data: court
  });
}));

/**
 * @desc    Search courts by location
 * @route   GET /api/v1/courts/search/nearby
 * @access  Public
 */
router.get('/search/nearby', asyncHandler(async (req, res) => {
  const { lat, lng, maxDistance = 10000 } = req.query; // maxDistance in meters

  if (!lat || !lng) {
    res.status(400);
    throw new Error('Latitude and longitude are required');
  }

  const courts = await Court.find({
    status: 'approved',
    deletedAt: { $exists: false },
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseInt(maxDistance)
      }
    }
  }).limit(20);

  res.json({
    success: true,
    data: courts,
    count: courts.length
  });
}));

module.exports = router;
