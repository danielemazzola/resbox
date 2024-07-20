const ROUTER = require('express').Router();
const {
  getUser,
  getUsers,
  updateStatus,
} = require('../../controllers/adminController/customerController/customerController');
const { isAuthSuperAdmin } = require('../../middleware/isAuth');

ROUTER.get('/get-user/:id_user', isAuthSuperAdmin, getUser);
ROUTER.put('/update-user-status/:id_user', isAuthSuperAdmin, updateStatus);
ROUTER.get('/get-users', isAuthSuperAdmin, getUsers);

module.exports = ROUTER;
