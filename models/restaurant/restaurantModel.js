const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const restaurantSchema = mongoose.Schema(
  {
    restaurant_name: {
      type: String,
      required: true
    },
    restaurant_cif: {
      type: String,
      required: true
    },
    owner_name: {
      type: String,
      required: true
    },
    owner_lastName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
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
      default: 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    principal_address: {
      type: String,
      required: true
    },
    locations_restaurant: [
      {
        address: {
          type: String,
          required: true
        },
        coordinates: {
          type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
          },
          coordinates: {
            type: [Number],
            required: true
          }
        }
      }
    ]
  },
  {
    timestamps: true,
    collection: 'Restaurant'
  }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
