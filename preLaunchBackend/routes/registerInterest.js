const express = require('express');
const router = express.Router();
const Waitlist = require('../db/waitlist');
const { waitlistRateLimit, generalRateLimit, adminRateLimit } = require('../middleware/rateLimiter');

// POST - Join waitlist (with rate limiting)
router.post('/', waitlistRateLimit, async (req, res) => {
  try {
    const { firstName, lastName, email, source, referralCode } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, and email are required',
        errors: {
          firstName: !firstName ? 'First name is required' : null,
          lastName: !lastName ? 'Last name is required' : null,
          email: !email ? 'Email is required' : null
        }
      });
    }

    // Check if email already exists
    const existingUser = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered on waitlist',
        data: {
          position: existingUser.position,
          joinedAt: existingUser.joinedAt
        }
      });
    }

    // Create new waitlist entry
    const waitlistEntry = new Waitlist({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      source: source || 'website',
      referralCode: referralCode || undefined
    });

    await waitlistEntry.save();

    // Get total count for response
    const totalCount = await Waitlist.getTotalCount();

    res.status(201).json({
      success: true,
      message: 'Successfully joined the waitlist!',
      data: {
        position: waitlistEntry.position,
        totalUsers: totalCount,
        joinedAt: waitlistEntry.joinedAt,
        email: waitlistEntry.email
      }
    });

  } catch (error) {
    console.error('Waitlist registration error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered on waitlist'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// GET - Get waitlist position by email (with general rate limiting)
router.get('/position/:email', generalRateLimit, async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await Waitlist.findOne({ 
      email: email.toLowerCase(), 
      isActive: true 
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email not found on waitlist'
      });
    }

    const totalCount = await Waitlist.getTotalCount();

    res.json({
      success: true,
      data: {
        position: user.position,
        totalUsers: totalCount,
        joinedAt: user.joinedAt,
        firstName: user.firstName
      }
    });

  } catch (error) {
    console.error('Get position error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET - Get waitlist stats (with general rate limiting)
router.get('/stats', generalRateLimit, async (req, res) => {
  try {
    const totalCount = await Waitlist.getTotalCount();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todaySignups = await Waitlist.countDocuments({
      joinedAt: { $gte: todayStart },
      isActive: true
    });

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    
    const weekSignups = await Waitlist.countDocuments({
      joinedAt: { $gte: weekStart },
      isActive: true
    });

    res.json({
      success: true,
      data: {
        totalUsers: totalCount,
        todaySignups,
        weekSignups,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET - Get all waitlist entries (admin only with strict rate limiting)
router.get('/all', adminRateLimit, async (req, res) => {
  try {
    const { page = 1, limit = 50, source } = req.query;
    
    const query = { isActive: true };
    if (source) query.source = source;

    const options = {
      sort: { position: 1 },
      page: parseInt(page),
      limit: parseInt(limit)
    };

    const users = await Waitlist.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .select('-__v');

    const totalCount = await Waitlist.countDocuments(query);
    const totalPages = Math.ceil(totalCount / options.limit);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: options.page,
          totalPages,
          totalUsers: totalCount,
          hasNextPage: options.page < totalPages,
          hasPrevPage: options.page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// DELETE - Remove from waitlist (admin only with strict rate limiting)
router.delete('/:email', adminRateLimit, async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await Waitlist.findOne({ 
      email: email.toLowerCase(), 
      isActive: true 
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email not found on waitlist'
      });
    }

    await user.removeFromWaitlist();

    res.json({
      success: true,
      message: 'Successfully removed from waitlist',
      data: {
        email: user.email,
        removedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Remove from waitlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;