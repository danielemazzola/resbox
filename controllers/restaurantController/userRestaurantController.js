const bcrypt = require('bcrypt')
const { isAdmin } = require('./helpers/isAdmin')
const UserRestaurant = require('../../models/restaurantModel/UserRestaurantModel')
const Restaurant = require('../../models/restaurantModel/restaurantModel')
const { deleteImg } = require('../../middleware/deleteImage')
const { generateJWT } = require('../../config/helpers/generateJWT')
const { generateToken } = require('../../config/helpers/generateToken')
const {
  newUserEmail,
  recoverEmail,
  newPasswordEmail
} = require('./emails/sendEmails')

const create = async (req, res, next) => {
  const { restaurant } = req.params
  const existeRestaurant = await Restaurant.findById(restaurant)
  if (!existeRestaurant)
    return res.status(409).json({
      message: 'Restaurant does not exist, please contact the manager🔐'
    })
  const email = req.body.email.toLowerCase()
  try {
    const duplicate = await UserRestaurant.findOne({ email })
    if (duplicate) {
      return res
        .status(409)
        .json({ message: 'Existing user, please try to log in😊' })
    }
    const user = new UserRestaurant({
      ...req.body,
      email,
      id_restaurant: existeRestaurant._id
    })
    await user.save()
    existeRestaurant.users.push(user._id)
    await existeRestaurant.save()
    newUserEmail(user)
    return res
      .status(201)
      .json({ message: 'User registered successfully😉', user })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const login = async (req, res) => {
  const { password } = req.body
  const email = req.body.email.toLowerCase()
  try {
    const user = await UserRestaurant.findOne({ email }).populate({
      path: 'id_restaurant',
      populate: [
        {
          path: 'users',
          select: 'name lastname email avatar roles'
        },
        {
          path: 'boxes',
          populate: [
            {
              path: 'creator',
              select: 'name lastname email avatar roles'
            },
            {
              path: 'items_acquired_by.user',
              select: 'name lastname'
            },
            {
              path: 'items_acquired_by.box',
              select: 'name description status'
            }
          ]
        }
      ]
    })
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateJWT(user._id)
      const userResponse = isAdmin(user) // IS ADMIN RETURN NUMBER OF BANK
      return res.status(200).json({ user: userResponse, token })
    } else {
      return res.status(409).json({ message: 'Conflict with password' })
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const recoverPassword = async (req, res) => {
  const email = req.body.email.toLowerCase()
  try {
    const user = await UserRestaurant.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })
    user.token = generateToken()
    await user.save()
    await recoverEmail(user)
    return res.status(200).json({
      message:
        'We have sent a message to your inbox, please follow the password recovery instructions😊'
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const newPassword = async (req, res) => {
  const { token } = req.params
  const { user } = req
  const { password } = req.body
  try {
    user.password = password
    user.token = ''
    await user.save()
    await newPasswordEmail(user)
    return res
      .status(200)
      .json({ message: 'Password changed, please log in😍' })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

const profile = async (req, res, next) => {
  try {
    const user = await UserRestaurant.findById(req.user._id)
      .select('-password -__v')
      .populate({
        path: 'id_restaurant',
        populate: [
          {
            path: 'users',
            select: 'name lastname email avatar roles'
          },
          {
            path: 'boxes',
            populate: [
              {
                path: 'creator',
                select: 'name lastname email avatar roles'
              },
              {
                path: 'items_acquired_by.user',
                select: 'name lastname'
              },
              {
                path: 'items_acquired_by.box',
                select: 'name description status'
              }
            ]
          }
        ]
      })
    const userResponse = isAdmin(user) // IS ADMIN RETURN NUMBER OF BANK
    return res.status(200).json({ user: userResponse })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

const updateAvatar = async (req, res) => {
  try {
    const user = await UserRestaurant.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (req.file) {
      await deleteImg(user.avatar)
      req.body.image = req.file.path
    }
    const updateAvatar = await UserRestaurant.findByIdAndUpdate(
      user._id,
      { $set: { avatar: req.body.image } },
      { new: true }
    )
    if (!user) return res.status(404).json({ message: 'User not found' })
    return res.status(201).json({ message: 'User update', updateAvatar })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

module.exports = {
  create,
  login,
  recoverPassword,
  newPassword,
  profile,
  updateAvatar
}
