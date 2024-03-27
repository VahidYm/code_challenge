'use strict';

const { body } = require('express-validator');

const newCommentValidator = [
    body('content', 'The comment should be a string').isString(),
    body('content', 'The length of the comment should be between 2 and 500 characters').isLength({ min: 2, max: 500 }),

    body('user_id', 'The user_id should be a number')
        .isNumeric(),
    body('user_id', 'The user_id must be bigger than 1.')
        .isInt({ min: 1, max: 1e+10 }),
];

const likeUnlikeValidator = [
    body('voter_user_id', 'The voter_user_id should be a number')
        .isNumeric(),
    body('voter_user_id', 'The voter_user_id must be bigger than 1')
        .isInt({ min: 1, max: 1e+10 }),
];

module.exports = {
    newCommentValidator,
    likeUnlikeValidator,
};
