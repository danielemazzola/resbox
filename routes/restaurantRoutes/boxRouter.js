const { isAuthRestaurant } = require('../../middleware/isAuth')
const {
  createBox
} = require('../../controllers/restaurantController/boxController/boxController')

const ROUTER = require('express').Router()

ROUTER.post('/create-box', isAuthRestaurant, createBox) // CRETAE BOX

module.exports = ROUTER
