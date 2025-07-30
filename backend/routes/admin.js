const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/User');
const Item = require('../models/Item');
const SwapRequest = require('../models/SwapRequest');
const PointsTransaction = require('../models/PointsTransaction');

// All admin routes require authentication and admin role
router.use(auth);
router.use(admin);

// Admin dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalItems,
      totalSwaps,
      pendingApprovals,
      activeUsers,
      totalPoints
    ] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments(),
      SwapRequest.countDocuments(),
      Item.countDocuments({ status: 'pending' }),
      User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
      PointsTransaction.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalItems,
        totalSwaps,
        pendingApprovals,
        activeUsers,
        totalPoints: totalPoints[0]?.total || 0,
        recentActivity: {
          newUsers: await User.countDocuments({ 
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
          }),
          newItems: await Item.countDocuments({ 
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
          }),
          newSwaps: await SwapRequest.countDocuments({ 
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
          })
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin stats',
      error: error.message
    });
  }
});

// Get all users with pagination and filtering
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) {
      query.status = status;
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// Get all items with pagination and filtering
router.get('/items', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', category = '' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) {
      query.status = status;
    }
    if (category) {
      query.category = category;
    }

    const items = await Item.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Item.countDocuments(query);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch items',
      error: error.message
    });
  }
});

// Get all swaps with pagination and filtering
router.get('/swaps', async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const swaps = await SwapRequest.find(query)
      .populate('requester', 'name email')
      .populate('receiver', 'name email')
      .populate('requestedItem', 'title images')
      .populate('offeredItem', 'title images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await SwapRequest.countDocuments(query);

    res.json({
      success: true,
      data: {
        swaps,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch swaps',
      error: error.message
    });
  }
});

// Approve item
router.put('/items/:id/approve', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'active',
        approvedAt: new Date(),
        approvedBy: req.user._id
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item approved successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to approve item',
      error: error.message
    });
  }
});

// Reject item
router.put('/items/:id/reject', async (req, res) => {
  try {
    const { reason } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'rejected',
        rejectedAt: new Date(),
        rejectedBy: req.user._id,
        rejectionReason: reason
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item rejected successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reject item',
      error: error.message
    });
  }
});

// Remove/delete item
router.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove item',
      error: error.message
    });
  }
});

// Ban user
router.put('/users/:id/ban', async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'banned',
        bannedAt: new Date(),
        bannedBy: req.user._id,
        banReason: reason
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User banned successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to ban user',
      error: error.message
    });
  }
});

// Unban user
router.put('/users/:id/unban', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'active',
        bannedAt: null,
        bannedBy: null,
        banReason: null
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User unbanned successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to unban user',
      error: error.message
    });
  }
});

// Get user details with activity
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const [items, swaps, pointsTransactions] = await Promise.all([
      Item.find({ user: req.params.id }).countDocuments(),
      SwapRequest.find({ 
        $or: [{ requester: req.params.id }, { receiver: req.params.id }] 
      }).countDocuments(),
      PointsTransaction.find({ user: req.params.id }).sort({ createdAt: -1 }).limit(10)
    ]);

    res.json({
      success: true,
      data: {
        user,
        stats: {
          totalItems: items,
          totalSwaps: swaps,
          recentTransactions: pointsTransactions
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user details',
      error: error.message
    });
  }
});

// Get analytics data
router.get('/analytics', async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 7;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [userGrowth, itemGrowth, swapGrowth, topCategories] = await Promise.all([
      User.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Item.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      SwapRequest.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Item.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.json({
      success: true,
      data: {
        userGrowth,
        itemGrowth,
        swapGrowth,
        topCategories
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message
    });
  }
});

module.exports = router; 