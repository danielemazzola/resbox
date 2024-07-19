const { isAuthSuperAdmin } = require('../../middleware/isAuth');
const {
  createBox,
  update_box,
  remove_box,
  get_box,
  get_boxes,
} = require('../../controllers/adminController/boxController/boxController');
const { existBox } = require('../../middleware/existBox');

const ROUTER = require('express').Router();

ROUTER.post('/create-box', isAuthSuperAdmin, createBox); // CRETAE BOX
ROUTER.put('/update-box/:id_box', existBox, isAuthSuperAdmin, update_box); // UPDATE BOX
ROUTER.delete('/remove-box/:id_box', existBox, isAuthSuperAdmin, remove_box); // GET BY ID-BOX
ROUTER.get('/get-box/:id_box', existBox, isAuthSuperAdmin, get_box); // GET BY ID-BOX
ROUTER.get('/get-all-boxes', isAuthSuperAdmin, get_boxes); // GET ALL-BOX

module.exports = ROUTER;
