const ROUTER = require('express').Router();
const {
  new_review,
  new_comment,
  reactions,
} = require('../../controllers/reviewCommentsController/reviewCommentsController');

ROUTER.post('/new-review/:id_user', new_review);
ROUTER.post('/new-comment/:id_restaurant', new_comment);
ROUTER.post('/reaction', reactions);

module.exports = ROUTER;
