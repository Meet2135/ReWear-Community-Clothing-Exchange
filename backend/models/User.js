const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  bio: {
    type: String,
    maxlength: [200, 'Bio cannot be more than 200 characters']
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot be more than 100 characters']
  },
  phone: {
    type: String,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please add a valid phone number']
  },
  points: {
    type: Number,
    default: 0,
    min: [0, 'Points cannot be negative']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    categories: [{
      type: String,
      enum: ['men', 'women', 'kids', 'accessories', 'shoes', 'bags']
    }],
    sizes: [{
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    }],
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    }
  },
  stats: {
    itemsListed: { type: Number, default: 0 },
    itemsSwapped: { type: Number, default: 0 },
    pointsEarned: { type: Number, default: 0 },
    pointsSpent: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 }
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for average rating
userSchema.virtual('averageRating').get(function() {
  return this.stats.totalRatings > 0 
    ? (this.stats.rating / this.stats.totalRatings).toFixed(1) 
    : 0;
});

// Virtual for items relationship
userSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

// Virtual for swap requests sent
userSchema.virtual('swapRequestsSent', {
  ref: 'SwapRequest',
  localField: '_id',
  foreignField: 'requester',
  justOne: false
});

// Virtual for swap requests received
userSchema.virtual('swapRequestsReceived', {
  ref: 'SwapRequest',
  localField: '_id',
  foreignField: 'receiver',
  justOne: false
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ 'preferences.categories': 1 });
userSchema.index({ location: 1 });

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update last active timestamp
userSchema.methods.updateLastActive = function() {
  this.lastActive = new Date();
  return this.save();
};

// Add points to user
userSchema.methods.addPoints = function(points) {
  this.points += points;
  this.stats.pointsEarned += points;
  return this.save();
};

// Deduct points from user
userSchema.methods.deductPoints = function(points) {
  if (this.points < points) {
    throw new Error('Insufficient points');
  }
  this.points -= points;
  this.stats.pointsSpent += points;
  return this.save();
};

// Update user stats
userSchema.methods.updateStats = function(type, value = 1) {
  switch (type) {
    case 'itemListed':
      this.stats.itemsListed += value;
      break;
    case 'itemSwapped':
      this.stats.itemsSwapped += value;
      break;
    case 'rating':
      this.stats.rating += value;
      this.stats.totalRatings += 1;
      break;
  }
  return this.save();
};

module.exports = mongoose.model('User', userSchema); 