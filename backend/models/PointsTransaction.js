const mongoose = require('mongoose');

const pointsTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['earned', 'spent', 'bonus', 'penalty'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  relatedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  relatedSwap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SwapRequest'
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for efficient queries
pointsTransactionSchema.index({ user: 1, createdAt: -1 });
pointsTransactionSchema.index({ type: 1, createdAt: -1 });

const PointsTransaction = mongoose.model('PointsTransaction', pointsTransactionSchema);

module.exports = PointsTransaction; 