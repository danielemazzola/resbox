const ROUTER = require('express').Router()
const { profileAvatar } = require('../../middleware/uploadImage')
const {
  tokenRecoveryPasswordUser
} = require('../../middleware/tokenRecoveryPassword')
const {
  create,
  confirmAccount,
  recoverPassword,
  newPassword,
  login,
  profile,
  updateAvatar
} = require('../../controllers/UserController/userController')
const { isAuthUser } = require('../../middleware/isAuth')

ROUTER.post('/register', create) // NEW USER
ROUTER.put('/confirm-account/:email', confirmAccount) // CONFIRM - ACCOUNT
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put('/recovery-password/:token', tokenRecoveryPasswordUser, newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN
ROUTER.get('/profile', isAuthUser, profile) // PROFILE USER
ROUTER.put(
  '/update-avatar',
  isAuthUser,
  profileAvatar.single('avatar'),
  updateAvatar
) // CHANGE AVATAR

module.exports = ROUTER
