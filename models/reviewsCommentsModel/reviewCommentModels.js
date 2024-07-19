const { default: mongoose } = require('mongoose');

// REPLIES TO COMMENTS
const replyCommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    id_user_restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'deleted', 'hidden'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// LIKES - DISLIKES
const reactionSchema = new mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['like', 'dislike'],
      required: false,
    },
  },
  { timestamps: true }
);

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
      trim: true,
    },
    id_restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'deleted', 'hidden'],
      default: 'active',
    },
    replies: {
      type: [replyCommentSchema],
      default: [],
    },
    reactions: {
      type: [reactionSchema],
      default: [],
    },
  },
  { timestamps: true, collection: 'Review' }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
