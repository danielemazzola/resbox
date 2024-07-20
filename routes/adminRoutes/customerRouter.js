const ROUTER = require('express').Router();
const {
  getUser,
  getUsers,
  updateStatus,
} = require('../../controllers/adminController/customerController/customerController');

ROUTER.use('/get-user/:id_user', getUser);
ROUTER.use('/get-users', getUsers);
ROUTER.use('/update-user-status/:id_user', updateStatus);

module.exports = ROUTER;
