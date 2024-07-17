const ROUTER = require('express').Router()
const { profileAvatar } = require('../../middleware/uploadImage')
const { existTokenRestaurant } = require('../../middleware/existToken')
const {
  create,
  recoverPassword,
  newPassword,
  login,
  profile,
  updateAvatar,
  createBox
} = require('../../controllers/restaurantController/userRestaurantController')
const { isAuthRestaurant } = require('../../middleware/isAuth')

ROUTER.post('/register/:restaurant', create) // NEW USER
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put('/recovery-password/:token', existTokenRestaurant, newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN
ROUTER.get('/profile', isAuthRestaurant, profile) // PROFILE USER
ROUTER.put(
  '/update-avatar',
  isAuthRestaurant,
  profileAvatar.single('avatar'),
  updateAvatar
) // CHANGE AVATAR
ROUTER.post('/create-box', isAuthRestaurant, createBox) // CRETAE BOX

module.exports = ROUTER
