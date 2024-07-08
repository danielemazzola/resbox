const ROUTER = require('express').Router()
const { profileAvatar } = require('../../middleware/uploadImage')
const {
  tokenRecoveryPasswordAdmin
} = require('../../middleware/tokenRecoveryPassword')
const { isAuth } = require('../../middleware/isAuth')
const {
  create,
  recoverPassword,
  newPassword,
  login,
  profile,
  updateAvatar
} = require('../../controllers/CRM-SUPER-ADMIN/adminController')

ROUTER.post('/register-admin', create) // NEW ADMIN
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put('/recovery-password/:token', tokenRecoveryPasswordAdmin, newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN
ROUTER.get('/profile', isAuth, profile) // PROFILE ADMIN
ROUTER.put(
  '/update-avatar',
  isAuth,
  profileAvatar.single('avatar'),
  updateAvatar
) // CHANGE AVATAR

module.exports = ROUTER
