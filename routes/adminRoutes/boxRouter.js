const {
  createBox
} = require('../../controllers/adminController/boxController/boxController')
const { isAuthSuperAdmin } = require('../../middleware/isAuth')

const ROUTER = require('express').Router()

ROUTER.post('/create-box', isAuthSuperAdmin, createBox) // CRETAE BOX

module.exports = ROUTER
