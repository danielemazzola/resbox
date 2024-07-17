const { default: mongoose } = require('mongoose')

const replayCommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'deleted', 'hidden'],
      default: 'active'
    }
  },
  { timestamps: true }
)

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true
    },
    id_restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'deleted', 'hidden'],
      default: 'active'
    },
    replies: {
      type: [replayCommentSchema],
      default: []
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = commentSchema
