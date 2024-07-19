const mongoose = require('mongoose');

const operationsSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    box_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Box',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
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
