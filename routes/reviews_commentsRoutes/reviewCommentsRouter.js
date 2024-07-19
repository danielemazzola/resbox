const ROUTER = require('express').Router();
const {
  new_review,
  new_comment,
  reactions,
} = require('../../controllers/reviewCommentsController/reviewCommentsController');
const { isAuthUser, isAuthRestaurant } = require('../../middleware/isAuth');

ROUTER.post('/new-review/:id_restaurant', isAuthUser, new_review);
ROUTER.put('/new-comment/:id_review', isAuthRestaurant, new_comment);
ROUTER.post('/reaction', reactions);

module.exports = ROUTER;
