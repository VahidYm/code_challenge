'use strict';

const express = require('express');
const router = express.Router();
const commentController = require('../api/comment/comment.controller');
const commentValidator = require('../validators/comment.validator');

module.exports = function() {
  router.post('', commentValidator.newCommentValidator ,commentController.newComment);
  router.get('/:comment_id', commentController.getComment);
  router.get('/user/:user_id', commentController.getUserComments)
  router.patch('/like/:comment_id', commentValidator.likeUnlikeValidator, commentController.like)
  router.patch('/unlike/:comment_id', commentValidator.likeUnlikeValidator, commentController.unlike)
  
  return router;
}