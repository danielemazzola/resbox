const ROUTER = require('express').Router();
const {
  new_review,
  new_comment,
  reactions,
} = require('../../controllers/reviewCommentsController/reviewCommentsController');
const { isAuthUser } = require('../../middleware/isAuth');

ROUTER.post('/new-review/:id_restaurant', isAuthUser, new_review);
ROUTER.post('/new-comment/:id_review', new_comment);
ROUTER.post('/reaction', reactions);

module.exports = ROUTER;
