const { isAuthUser, isAuthRestaurant } = require('../../middleware/isAuth');
const { userStatus } = require('../../middleware/userStatus');
const { createOperation, updateOperation } = require('../../controllers/operationController/operationController');
const { existSecureTokenOperation } = require('../../middleware/existSecureTokenOperation');

const ROUTER = require('express').Router();

ROUTER.post('/create-operation/:id_box', isAuthUser, userStatus, createOperation);
ROUTER.put('/update-operation/:secure_token', isAuthRestaurant, existSecureTokenOperation, updateOperation);

module.exports = ROUTER;
