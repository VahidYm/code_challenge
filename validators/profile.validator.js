'use strict';

const { body } = require('express-validator');

const newProfileValidator = [
    body('name', 'The name should be a string')
        .isString(),
    body('name', 'The length of the name should be between 3 and 100 characters')
        .isLength({ min: 3, max: 100 }),

    body('description', 'The description should be a string')
        .isString(),
    body('description', 'The length of the description should be between 10 and 1000 characters')
        .isLength({ min: 10, max: 1000 }),

    body('mbti', 'The MBTI should be a string')
        .isString(),
    body('mbti')
        .custom( value => {
            const mbtiTypes = [
                'INTJ', 'INTP', 'ENTJ', 'ENTP',
                'INFJ', 'INFP', 'ENFJ', 'ENFP',
                'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
                'ISTP', 'ISFP', 'ESTP', 'ESFP',
            ];

            if (!mbtiTypes.includes(value)) {
                throw new Error('The MBTI type is not valid');
            }

            return true;
        }),
    
    body('enneagram', 'The enneagram should be a string')
        .isString(),
    body('enneagram', 'The length of the enneagram should be 3 characters')
        .isLength({ min: 3, max: 3 }),

    body('variant', 'The variant should be a string')
        .isString(),
    body('variant', 'The length of the variant should be between 2 and 5 characters')
        .isLength({ min: 2, max: 5 }),

    body('tritype', 'The tritype should be a number')
        .isNumeric(),
    body('tritype', 'The tritype must be a 3-digit number.')
        .isLength({ min: 3, max: 3 }),

    body('socionics', 'The socionics should be a string')
        .isString(),
    body('socionics')
        .custom( value => {
            const mbtiTypes = [
                'LII', 'ILE', 'ESE', 'SEI',
                'LSI', 'SLE', 'EIE', 'IEI',
                'ESI', 'SEE', 'LIE', 'ILI',
                'EII', 'IEE', 'LSE', 'SLI',
            ];

            if (!mbtiTypes.includes(value)) {
                throw new Error('The socionics type is not valid');
            }

            return true;
        }),

    body('sloan', 'The sloan should be a string')
        .isString(),
    body('sloan', 'The length of the sloan should be 5 characters')
        .isLength({ min: 5, max: 5 }),

    body('psyche', 'The psyche should be a string')
        .isString(),
    body('psyche')
        .custom( value => {
            const mbtiTypes = [
                'FVLE', 'FLVE', 'EVLF', 'ELVF',
                'LVFE', 'LFVE', 'EVFL', 'EFVL',
                'VLFE', 'VFLE', 'ELFV', 'EFLV',
                'VFEL', 'VEFL', 'LFEV', 'LEFV',
                'VLEF', 'VELF', 'FLEV', 'FELV',
                'LVEF', 'LEVF', 'FVEL', 'FEVL',
            ];

            if (!mbtiTypes.includes(value)) {
                throw new Error('The psyche type is not valid');
            }

            return true;
        }),
];

module.exports = { newProfileValidator };