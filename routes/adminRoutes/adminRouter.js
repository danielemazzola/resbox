const ROUTER = require('express').Router()
const { profileAvatar } = require('../../middleware/uploadImage')
const {
  tokenRecoveryPasswordAdmin
} = require('../../middleware/tokenRecoveryPassword')
const { isAuthSuperAdmin } = require('../../middleware/isAuth')
const {
  create,
  recoverPassword,
  newPassword,
  login,
  profile,
  updateAvatar
} = require('../../controllers/adminController/adminController')
const {
  newRestaurant,
  confirmAccountrestaurant,
  updateRolesUserRestaurant
} = require('../../controllers/adminController/restaurantController')
const { uploadFile } = require('../../middleware/uploadFile')

ROUTER.post('/register-admin', create) // NEW ADMIN
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put('/recovery-password/:token', tokenRecoveryPasswordAdmin, newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN
ROUTER.get('/profile', isAuthSuperAdmin, profile) // PROFILE ADMIN
ROUTER.put(
  '/update-avatar',
  isAuthSuperAdmin,
  profileAvatar.single('avatar'),
  updateAvatar
) //CHANGE AVATAR

// RESTAURANT CONTROLLER
ROUTER.post('/create-restaurant', uploadFile.single('file'), newRestaurant) // CRETAE RESTAURANT
ROUTER.post('/create-restaurant', confirmAccountrestaurant) // CONFIRM ACCOUNT RESTAURANT
ROUTER.post('/create-restaurant', updateRolesUserRestaurant) // UPDATE ROLES USERS RESTAURANT

module.exports = ROUTER
