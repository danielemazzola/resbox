const mongoose = require('mongoose')

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
    usage_limit: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    creator: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'UserRestaurant'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'Box'
  }
)

const Box = mongoose.model('Box', boxSchema)

module.exports = Box
