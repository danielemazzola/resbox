const bcrypt = require('bcrypt')
const { generateJWT } = require('../../config/helpers/generateJWT')
const { generateToken } = require('../../config/helpers/generateToken')
const { deleteImg } = require('../../middleware/deleteImage')

const User = require('../../models/customerModel/userModel')
const {
  newUserEmail,
  recoverEmail,
  newPasswordEmail
} = require('./emails/sendEmails')
const Box = require('../../models/restaurantModel/box-pack/boxPackModel')

const create = async (req, res, next) => {
  const email = req.body.email.toLowerCase()
  try {
    const duplicate = await User.findOne({ email })
    if (duplicate) {
      return res
        .status(409)
        .json({ message: 'Existing user, please try to log in😊' })
    }
    const user = new User({ ...req.body, email })
    await user.save()
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
const confirmAccount = async (req, res) => {
  const { id_user } = req.params
  try {
    const exist = await User.findById(id_user)
    if (!exist) return res.status(404).json({ message: 'User not found' })
    if (exist.confirmed)
      return res
        .status(200)
        .json({ message: 'The user has already benn confirmed😊' })
    const user = await User.findByIdAndUpdate(
      exist._id,
      { $set: { confirmed: true } },
      { new: true }
    )
    return res.status(200).json({ message: 'Confirmed Account, thank you❤️' })
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
    const user = await User.findOne({ email }).populate({
      path: 'purchasedBoxes.box',
      select: 'name_box status',
      populate: [{ path: 'id_restaurant', select: 'restaurant_name' }]
    })
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateJWT(user._id)
      return res.status(200).json({ user, token })
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
    const user = await User.findOne({ email })
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
    const user = await User.findById(req.user._id)
      .select('-token -password -createdAt -updatedAt -__v')
      .populate({
        path: 'purchasedBoxes.box',
        select: 'name_box status',
        populate: [{ path: 'id_restaurant', select: 'restaurant_name' }]
      })
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

const updateAvatar = async (req, res) => {
  const { user } = req
  try {
    if (req.file) {
      await deleteImg(user.avatar)
      req.body.image = req.file.path
    }
    const updateAvatar = await User.findByIdAndUpdate(
      user._id,
      { $set: { avatar: req.body.image } },
      { new: true }
    ).select('-password -createdAt -updatedAt -__v -token')
    return res.status(201).json({ message: 'User update', updateAvatar })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

const buyBox = async (req, res) => {
  const { user } = req
  const { box } = req

  try {
    const existBox = user.purchasedBoxes.find(
      (userBox) => userBox.box.toString() === box._id.toString()
    )

    let updateResult

    if (existBox) {
      updateResult = await User.findOneAndUpdate(
        { _id: user._id, 'purchasedBoxes.box': box._id },
        {
          $inc: { 'purchasedBoxes.$.remainingItems': box.usage_limit }
        },
        { new: true }
      )

      if (!updateResult) {
        return res.status(404).json({ message: 'User not found🤨' })
      }

      await Box.findByIdAndUpdate(
        box._id,
        {
          $push: { items_acquired_by: { user: user._id, box: box._id } }
        },
        { new: true }
      )
      return res
        .status(200)
        .json({ message: 'Box updated successfully❤️', updateResult })
    } else {
      updateResult = await User.findByIdAndUpdate(
        user._id,
        {
          $push: {
            purchasedBoxes: {
              box: box._id,
              remainingItems: box.usage_limit
            }
          }
        },
        { new: true }
      )

      if (!updateResult) {
        return res.status(404).json({ message: 'User not found🤨' })
      }

      await Box.findByIdAndUpdate(
        box._id,
        {
          $push: { items_acquired_by: { user: user._id, box: box._id } }
        },
        { new: true }
      )

      return res
        .status(201)
        .json({ message: 'You have a new BOX❤️', updateResult })
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

module.exports = {
  create,
  confirmAccount,
  login,
  recoverPassword,
  newPassword,
  profile,
  updateAvatar,
  buyBox
}
