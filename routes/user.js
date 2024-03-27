'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../api/user/user.controller');
const userValidator = require('../validators/user.validator');

module.exports = function() {
  router.post('', userValidator.newUserValidator, userController.newUser);
  router.get('/:user_id', userController.getUser);
  
  return router;
}