const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['men', 'women', 'kids', 'accessories', 'shoes', 'bags'],
    index: true
  },
  type: {
    type: String,
    required: [true, 'Please select a type'],
    enum: ['shirts', 'pants', 'dresses', 'skirts', 'jackets', 'coats', 'sweaters', 'hoodies', 't-shirts', 'jeans', 'shorts', 'suits', 'formal', 'casual', 'sports', 'underwear', 'sleepwear', 'swimwear', 'other']
  },
  size: {
    type: String,
    required: [true, 'Please select a size'],
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size', 'Custom'],
    index: true
  },
  condition: {
    type: String,
    required: [true, 'Please select condition'],
    enum: ['new', 'like-new', 'excellent', 'good', 'fair', 'poor'],
    index: true
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, 'Brand cannot be more than 50 characters']
  },
  color: {
    type: String,
    required: [true, 'Please add color'],
    trim: true,
    maxlength: [30, 'Color cannot be more than 30 characters']
  },
  material: {
    type: String,
    trim: true,
    maxlength: [100, 'Material cannot be more than 100 characters']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot be more than 20 characters']
  }],
  pointsValue: {
    type: Number,
    required: [true, 'Please set points value'],
    min: [1, 'Points value must be at least 1'],
    max: [1000, 'Points value cannot exceed 1000']
  },
  isAvailable: {
    type: Boolean,
    default: true,
    index: true
  },
  isApproved: {
    type: Boolean,
    default: true,
    index: true
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot be more than 100 characters']
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  season: [{
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter', 'all-season']
  }],
  style: [{
    type: String,
    enum: ['casual', 'formal', 'business', 'sporty', 'vintage', 'bohemian', 'minimalist', 'streetwear', 'elegant', 'punk', 'gothic', 'preppy', 'hipster', 'classic', 'modern']
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  swapRequests: [{
    type: mongoose.Schema.ObjectId,
    ref: 'SwapRequest'
  }],
  status: {
    type: String,
    enum: ['active', 'pending', 'swapped', 'expired', 'removed'],
    default: 'pending',
    index: true
  },
  expiryDate: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days from now
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for likes count
itemSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual for swap requests count
itemSchema.virtual('swapRequestsCount').get(function() {
  return this.swapRequests.length;
});

// Virtual for days until expiry
itemSchema.virtual('daysUntilExpiry').get(function() {
  const now = new Date();
  const expiry = new Date(this.expiryDate);
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

// Virtual for is expired
itemSchema.virtual('isExpired').get(function() {
  return new Date() > this.expiryDate;
});

// Indexes for better query performance
itemSchema.index({ category: 1, isAvailable: 1, isApproved: 1 });
itemSchema.index({ size: 1, isAvailable: 1, isApproved: 1 });
itemSchema.index({ condition: 1, isAvailable: 1, isApproved: 1 });
itemSchema.index({ pointsValue: 1, isAvailable: 1, isApproved: 1 });
itemSchema.index({ user: 1, status: 1 });
itemSchema.index({ createdAt: -1 });
itemSchema.index({ views: -1 });
itemSchema.index({ tags: 1 });
itemSchema.index({ brand: 1 });
itemSchema.index({ color: 1 });
itemSchema.index({ 'style': 1 });
itemSchema.index({ 'season': 1 });

// Text index for search functionality
itemSchema.index({
  title: 'text',
  description: 'text',
  brand: 'text',
  tags: 'text'
});

// Pre-save middleware to set primary image
itemSchema.pre('save', function(next) {
  if (this.images.length > 0 && !this.images.some(img => img.isPrimary)) {
    this.images[0].isPrimary = true;
  }
  next();
});

// Pre-save middleware to check expiry
itemSchema.pre('save', function(next) {
  if (this.isExpired && this.status === 'active') {
    this.status = 'expired';
    this.isAvailable = false;
  }
  next();
});

// Method to increment views
itemSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to toggle like
itemSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.indexOf(userId);
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userId);
  }
  return this.save();
};

// Method to add swap request
itemSchema.methods.addSwapRequest = function(swapRequestId) {
  if (!this.swapRequests.includes(swapRequestId)) {
    this.swapRequests.push(swapRequestId);
  }
  return this.save();
};

// Method to remove swap request
itemSchema.methods.removeSwapRequest = function(swapRequestId) {
  const index = this.swapRequests.indexOf(swapRequestId);
  if (index > -1) {
    this.swapRequests.splice(index, 1);
  }
  return this.save();
};

// Method to mark as swapped
itemSchema.methods.markAsSwapped = function() {
  this.status = 'swapped';
  this.isAvailable = false;
  return this.save();
};

// Static method to get featured items
itemSchema.statics.getFeaturedItems = function(limit = 10) {
  return this.find({
    isFeatured: true,
    isAvailable: true,
    isApproved: true,
    status: 'active'
  })
  .populate('user', 'name avatar rating')
  .sort({ createdAt: -1 })
  .limit(limit);
};

// Static method to search items
itemSchema.statics.searchItems = function(searchTerm, filters = {}) {
  const query = {
    isAvailable: true,
    isApproved: true,
    status: 'active'
  };

  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  // Apply filters
  if (filters.category) query.category = filters.category;
  if (filters.size) query.size = filters.size;
  if (filters.condition) query.condition = filters.condition;
  if (filters.minPoints) query.pointsValue = { $gte: filters.minPoints };
  if (filters.maxPoints) query.pointsValue = { ...query.pointsValue, $lte: filters.maxPoints };
  if (filters.brand) query.brand = new RegExp(filters.brand, 'i');
  if (filters.color) query.color = new RegExp(filters.color, 'i');

  return this.find(query)
    .populate('user', 'name avatar rating')
    .sort(filters.sortBy || { createdAt: -1 });
};

module.exports = mongoose.model('Item', itemSchema); 