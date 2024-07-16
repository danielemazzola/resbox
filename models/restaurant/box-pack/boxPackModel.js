const mongoose = require('mongoose')

const redeemedSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    item_redeemed: {
      type: Number,
      required: true,
      default: 1
    },
    redeemed_at: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
)

const boxSchema = mongoose.Schema(
  {
    id_restaurant: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    name_box: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    items_included: {
      type: Number,
      required: true
    },
    bonus_items: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    expiration_date: {
      type: Date,
      required: false
    },
    usage_limit: {
      type: Number,
      required: true
    },
    usage_count: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'expired'],
      default: 'active'
    },
    items_redeemed: {
      type: [redeemedSchema],
      default: []
    }
  },
  {
    timestamps: true,
    collection: 'Box'
  }
)

const Box = mongoose.model('Box', boxSchema)

module.exports = Box
