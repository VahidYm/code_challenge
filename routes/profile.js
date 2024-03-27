'use strict';

const express = require('express');
const router = express.Router();
const profileController = require('../api/profile/profile.controller');
const profileValidator = require('../validators/profile.validator');

module.exports = function() {
  router.post('', profileValidator.newProfileValidator, profileController.newProfile);
  router.get('/:profile_id?', profileController.getProfile);
  
  return router;
}