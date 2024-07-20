const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema para purchasedBoxes
const purchasedBoxSchema = new mongoose.Schema(
  {
    box: {
      type: mongoose.Types.ObjectId,
      ref: 'Box',
      required: true,
    },
    remainingItems: {
      type: Number,
      required: true,
    },
    id_restaurant_consumed: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png',
    },
    token: {
      type: String,
      trim: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    purchasedBoxes: [purchasedBoxSchema],
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    status: {
      type: [String],
      enum: ['active', 'suspend'],
      default: ['active'],
    },
  },
  {
    timestamps: true,
    collection: 'User',
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
