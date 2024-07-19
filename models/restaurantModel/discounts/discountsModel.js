const mongoose = require('mongoose');

const usedSchema = new mongoose.Schema(
  {
    restaurant_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
      required: false,
    },
    operation_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Operation',
      required: false,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    used_at: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const discountSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    used: {
      type: [usedSchema],
      default: [],
    },
    discount_percentage: {
      type: Number,
      required: true,
    },
    expiration_date: {
      type: Date,
      required: true,
    },
    start_date: {
      type: Date,
      default: Date.now,
    },
    usage_limit: {
      type: Number,
      default: 1,
    },
    usage_count: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'expired'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    collection: 'Discount',
  }
);

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
