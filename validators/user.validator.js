'use strict';

const { body } = require('express-validator');

const newUserValidator = [
    body('name', 'The name should be a string').isString(),
    body('name', 'The length of the name should be between 3 and 100 characters').isLength({ min: 3, max: 100 })
];

module.exports = { newUserValidator };