const ROUTER = require('express').Router()
const { profileAvatar } = require('../../middleware/uploadImage')
const {
  tokenRecoveryPassword
} = require('../../middleware/tokenRecoveryPassword')
const { isAuth } = require('../../middleware/isAuth')
const {
  create,
  confirmAccount,
  recoverPassword,
  newPassword,
  login,
  profile,
  updateAvatar
} = require('../../controllers/UserController/userController')

ROUTER.post('/register', create) // NEW USER
ROUTER.put('/confirm-account/:email', confirmAccount) // CONFIRM - ACCOUNT
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put('/recovery-password/:token', tokenRecoveryPassword, newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN
ROUTER.get('/profile', isAuth, profile) // PROFILE USER
ROUTER.put(
  '/update-avatar',
  isAuth,
  profileAvatar.single('avatar'),
  updateAvatar
) // CHANGE AVATAR

module.exports = ROUTER
