const SwapRequest = require('../models/SwapRequest');

// @desc    Get all swaps
// @route   GET /api/swaps
// @access  Private
const getAllSwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find().populate('requester receiver item');
    res.json({
      success: true,
      count: swaps.length,
      data: swaps
    });
  } catch (error) {
    console.error('Get all swaps error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user swaps
// @route   GET /api/swaps/user
// @access  Private
const getUserSwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      $or: [{ requester: req.user.id }, { receiver: req.user.id }]
    }).populate('requester receiver item');
    
    res.json({
      success: true,
      count: swaps.length,
      data: swaps
    });
  } catch (error) {
    console.error('Get user swaps error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get pending swaps
// @route   GET /api/swaps/pending
// @access  Private
const getPendingSwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      receiver: req.user.id,
      status: 'pending'
    }).populate('requester item');
    
    res.json({
      success: true,
      count: swaps.length,
      data: swaps
    });
  } catch (error) {
    console.error('Get pending swaps error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single swap
// @route   GET /api/swaps/:id
// @access  Private
const getSwapById = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id).populate('requester receiver item');
    
    if (!swap) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    res.json({
      success: true,
      data: swap
    });
  } catch (error) {
    console.error('Get swap by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create swap request
// @route   POST /api/swaps
// @access  Private
const createSwap = async (req, res) => {
  try {
    req.body.requester = req.user.id;
    
    const swap = await SwapRequest.create(req.body);
    
    res.status(201).json({
      success: true,
      data: swap
    });
  } catch (error) {
    console.error('Create swap error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update swap
// @route   PUT /api/swaps/:id
// @access  Private
const updateSwap = async (req, res) => {
  try {
    let swap = await SwapRequest.findById(req.params.id);
    
    if (!swap) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    swap = await SwapRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: swap
    });
  } catch (error) {
    console.error('Update swap error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete swap
// @route   DELETE /api/swaps/:id
// @access  Private
const deleteSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);
    
    if (!swap) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    await swap.remove();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete swap error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Accept swap
// @route   POST /api/swaps/:id/accept
// @access  Private
const acceptSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);
    
    if (!swap) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    swap.status = 'accepted';
    await swap.save();

    res.json({
      success: true,
      data: swap
    });
  } catch (error) {
    console.error('Accept swap error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Reject swap
// @route   POST /api/swaps/:id/reject
// @access  Private
const rejectSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);
    
    if (!swap) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    swap.status = 'rejected';
    await swap.save();

    res.json({
      success: true,
      data: swap
    });
  } catch (error) {
    console.error('Reject swap error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Complete swap
// @route   POST /api/swaps/:id/complete
// @access  Private
const completeSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);
    
    if (!swap) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    swap.status = 'completed';
    await swap.save();

    res.json({
      success: true,
      data: swap
    });
  } catch (error) {
    console.error('Complete swap error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllSwaps,
  getUserSwaps,
  getPendingSwaps,
  getSwapById,
  createSwap,
  updateSwap,
  deleteSwap,
  acceptSwap,
  rejectSwap,
  completeSwap
}; 