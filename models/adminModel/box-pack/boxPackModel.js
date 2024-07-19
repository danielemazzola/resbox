const mongoose = require('mongoose');

const acquisitionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    box: {
      type: mongoose.Types.ObjectId,
      ref: 'Box',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const boxSchema = new mongoose.Schema(
  {
    name_box: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    items_included: {
      type: Number,
      required: true,
    },
    bonus_items: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    usage_limit: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    creator: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Admin',
      },
    ],
    items_acquired_by: [acquisitionSchema],
  },
  {
    timestamps: true,
    collection: 'Box',
  }
);

const Box = mongoose.model('Box', boxSchema);

module.exports = Box;
