const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      trim: true
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
    roles: {
      type: [String],
      enum: ['admin', 'super-admin'],
      default: ['admin']
    }
  },
  {
    timestamps: true,
    collection: 'Admin'
  }
)

adminSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
  }
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
