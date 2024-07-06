const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userRestaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
    },
    token: {
      type: String,
      trim: true
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    roles: {
      type: [String],
      enum: ['user', 'admin'],
      default: ['user']
    }
  },
  {
    timestamps: true,
    collection: 'UserRestaurant'
  }
)

userRestaurantSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
  }
})

const UserRestaurant = mongoose.model('UserRestaurant', userRestaurantSchema)
module.exports = UserRestaurant
