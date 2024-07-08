const ROUTER = require('express').Router()
const {
  createRestaurant
} = require('../controllers/restaurant/restaurantController')

ROUTER.post('/create-restaurant', createRestaurant)

module.exports = ROUTER
