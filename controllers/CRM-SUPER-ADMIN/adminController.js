const bcrypt = require('bcrypt')
const Admin = require('../../models/crm/adminModel')
const { generateJWT } = require('../../helpers/generateJWT')
const { generateToken } = require('../../helpers/generateToken')
const { deleteImg } = require('../../middleware/deleteImage')
const {
  newUserEmail,
  recoverEmail,
  newPasswordEmail
} = require('./emails/sendEmails')

const create = async (req, res, next) => {
  const email = req.body.email.toLowerCase()
  try {
    const duplicate = await Admin.findOne({ email })
    if (duplicate) {
      return res
        .status(409)
        .json({ message: 'Existing Admin, please try to log in😊' })
    }
    const admin = new Admin({ ...req.body, email })
    await admin.save()
    newUserEmail(admin)
    return res
      .status(201)
      .json({ message: 'Admin registered successfully😉', admin })
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
    const data = await Admin.findOne({ email })
    if (!data) return res.status(404).json({ message: 'admin not found' })
    if (bcrypt.compareSync(password, data.password)) {
      const token = generateJWT(data._id)
      return res.status(200).json({ data, token })
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
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(404).json({ message: 'admin not found' })
    admin.token = generateToken()
    await admin.save()
    await recoverEmail(admin)
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
  try {
    const admin = await Admin.findOne({ token })
    if (!admin)
      return res.status(409).json({
        message: 'Token invalid. Please check your email to try again😢'
      })
    const { password } = req.body
    admin.password = password
    admin.token = ''
    await admin.save()
    await newPasswordEmail(admin)
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
    const admin = await Admin.findById(req.user._id).select(
      '-token -password -createdAt -updatedAt -__v'
    )
    return res.status(200).json(admin)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

const updateAvatar = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id)
    if (!admin) return res.status(404).json({ message: 'Admin not found' })
    if (req.file) {
      await deleteImg(admin.avatar)
      req.body.image = req.file.path
    }
    const updateAvatar = await Admin.findByIdAndUpdate(
      admin._id,
      { $set: { avatar: req.body.image } },
      { new: true }
    ).select('-password -createdAt -updatedAt -__v -token')
    return res.status(201).json({ message: 'Admin update', updateAvatar })
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
