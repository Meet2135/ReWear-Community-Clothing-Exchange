const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ 
      isAvailable: true, 
      isApproved: true,
      status: 'active'
    }).populate('user', 'name avatar');

    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    console.error('Get all items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get featured items
// @route   GET /api/items/featured
// @access  Public
const getFeaturedItems = async (req, res) => {
  try {
    const items = await Item.getFeaturedItems(10);
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Get featured items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Search items
// @route   GET /api/items/search
// @access  Public
const searchItems = async (req, res) => {
  try {
    const { q, category, size, condition, minPoints, maxPoints } = req.query;
    
    const filters = {};
    if (category) filters.category = category;
    if (size) filters.size = size;
    if (condition) filters.condition = condition;
    if (minPoints || maxPoints) {
      filters.pointsValue = {};
      if (minPoints) filters.pointsValue.$gte = parseInt(minPoints);
      if (maxPoints) filters.pointsValue.$lte = parseInt(maxPoints);
    }

    const items = await Item.searchItems(q, filters);
    
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    console.error('Search items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name avatar');
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Get item by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Private
const createItem = async (req, res) => {
  try {
    req.body.user = req.user.id;
    
    // Handle image uploads
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file, index) => ({
        url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        publicId: `item_${Date.now()}_${index}`,
        isPrimary: index === 0 // First image is primary
      }));
      req.body.images = images;
    }

    // Parse tags if they exist
    if (req.body.tags) {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch (e) {
        req.body.tags = [];
      }
    }
    
    const item = await Item.create(req.body);
    
    res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Make sure user owns item
    if (item.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this item'
      });
    }

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file, index) => ({
        url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        publicId: `item_${Date.now()}_${index}`,
        isPrimary: index === 0 // First image is primary
      }));
      req.body.images = images;
    }

    // Parse tags if they exist
    if (req.body.tags) {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch (e) {
        req.body.tags = [];
      }
    }

    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Make sure user owns item
    if (item.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this item'
      });
    }

    await item.remove();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Toggle like on item
// @route   POST /api/items/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    await item.toggleLike(req.user.id);

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Increment item views
// @route   POST /api/items/:id/view
// @access  Public
const incrementViews = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    await item.incrementViews();

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Increment views error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's items
// @route   GET /api/items/my-items
// @access  Private
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    console.error('Get my items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllItems,
  getFeaturedItems,
  searchItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  toggleLike,
  incrementViews,
  getMyItems
}; 