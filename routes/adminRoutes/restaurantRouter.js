const ROUTER = require('express').Router();
const { isAuthSuperAdmin } = require('../../middleware/isAuth');
const { uploadFile } = require('../../middleware/uploadFile');
const {
  newRestaurant,
  confirmAccountrestaurant,
  updateRolesUserRestaurant,
} = require('../../controllers/adminController/restaurantController/restaurantController');

ROUTER.post('/create-restaurant', isAuthSuperAdmin, uploadFile.single('file'), newRestaurant); // CRETAE RESTAURANT
ROUTER.put('/confirm-restaurant/:id_restaurant', isAuthSuperAdmin, confirmAccountrestaurant); // CONFIRM ACCOUNT RESTAURANT
ROUTER.put('/update-roles-restaurant/:id_user', isAuthSuperAdmin, updateRolesUserRestaurant); // UPDATE ROLES USERS RESTAURANT

module.exports = ROUTER;
