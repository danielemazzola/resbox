const mongoose = require('mongoose');

const paidSchema = mongoose.Schema(
  {
    paid: {
      type: Boolean,
      default: false,
    },
    id_admin_paid: {
      type: mongoose.Types.ObjectId,
      ref: 'Admin',
    },
    id_transaction: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const operationsSchema = mongoose.Schema(
  {
    id_user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    id_restaurant: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    id_box: {
      type: mongoose.Types.ObjectId,
      ref: 'Box',
      required: true,
    },
    consumed: {
      type: Number,
      required: true,
    },
    paid: { type: paidSchema },
    transaction_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'Operations',
  }
);

const Operations = mongoose.model('Operations', operationsSchema);

module.exports = Operations;
