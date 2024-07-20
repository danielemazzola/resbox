const { isAuthUser } = require('../../middleware/isAuth');
const { createOperation } = require('../../controllers/operationController/operationController');
const { userStatus } = require('../../middleware/userStatus');

const ROUTER = require('express').Router();

ROUTER.post('/create-operation/:id_box', isAuthUser, userStatus, createOperation);

module.exports = ROUTER;
