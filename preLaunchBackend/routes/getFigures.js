const express = require('express');
const router = express.Router();
const Waitlist = require('../db/waitlist');

// GET - Get waitlist figures
router.get('/', async (req, res) => {
  try {
    // Get total active users on waitlist
    const totalUsers = await Waitlist.getTotalCount();
    
    // Get signups from today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todaySignups = await Waitlist.countDocuments({
      joinedAt: { $gte: todayStart },
      isActive: true
    });

    // Get signups from this week
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    
    const weekSignups = await Waitlist.countDocuments({
      joinedAt: { $gte: weekStart },
      isActive: true
    });

    // Get signups from this month
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    
    const monthSignups = await Waitlist.countDocuments({
      joinedAt: { $gte: monthStart },
      isActive: true
    });

    // Get breakdown by source
    const sourceBreakdown = await Waitlist.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get growth rate (comparing this week vs last week)
    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 14);
    const lastWeekEnd = new Date();
    lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);

    const lastWeekSignups = await Waitlist.countDocuments({
      joinedAt: { 
        $gte: lastWeekStart,
        $lt: lastWeekEnd
      },
      isActive: true
    });

    const growthRate = lastWeekSignups > 0 
      ? ((weekSignups - lastWeekSignups) / lastWeekSignups * 100).toFixed(1)
      : weekSignups > 0 ? 100 : 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        todaySignups,
        weekSignups,
        monthSignups,
        growthRate: parseFloat(growthRate),
        sourceBreakdown,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Get figures error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving waitlist figures',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET - Get simple count only
router.get('/count', async (req, res) => {
  try {
    const totalUsers = await Waitlist.getTotalCount();
    
    res.json({
      success: true,
      data: {
        totalUsers,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Get count error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving waitlist count',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;