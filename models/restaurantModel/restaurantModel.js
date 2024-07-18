const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const restaurantSchema = mongoose.Schema(
  {
    restaurant_name: {
      type: String,
      required: true,
      trim: true
    },
    restaurant_cif: {
      type: String,
      required: true,
      trim: true
    },
    owner_name: {
      type: String,
      required: true,
      trim: true
    },
    owner_lastName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    bank_name: {
      type: String,
      required: true,
      trim: true
    },
    bank_number_account: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
    },
    banner: {
      type: String,
      required: false,
      default:
        'https://www.v3rtice.com/wp-content/uploads/2021/06/organizacion-de-eventosblog-v3rtice-1.jpg'
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    offices_address: {
      type: String,
      required: true
    },
    coordinate_x: {
      type: String,
      required: true
    },
    coordinate_y: {
      type: String,
      required: true
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRestaurant'
      }
    ],
    rating: {
      type: Number,
      default: 0
    },
    ratingCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    collection: 'Restaurant'
  }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
