const Admin = require('../models/admin/adminModel')
const User = require('../models/customer/userModel')
const UserRestaurant = require('../models/restaurant/UserRestaurantModel')

const tokenRecoveryPasswordUser = async (req, res, next) => {
  const { token } = req.params
  try {
    const user = await User.findOne({ token })
    if (!user)
      return res
        .status(404)
        .json({ message: 'Token not found, please login😉' })
    else {
      req.user = user
      next()
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const tokenRecoveryPasswordRestaurant = async (req, res, next) => {
  const { token } = req.params
  try {
    const user = await UserRestaurant.findOne({ token })
    if (!user)
      return res
        .status(404)
        .json({ message: 'Token not found, please login😉' })
    else {
      req.user = user
      next()
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

const tokenRecoveryPasswordAdmin = async (req, res, next) => {
  const { token } = req.params
  try {
    const admin = await Admin.findOne({ token })
    if (!admin)
      return res
        .status(404)
        .json({ message: 'Token not found, please login😉' })
    else {
      req.admin = admin
      next()
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

module.exports = {
  tokenRecoveryPasswordUser,
  tokenRecoveryPasswordRestaurant,
  tokenRecoveryPasswordAdmin
}
