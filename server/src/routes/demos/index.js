const demos = require('express').Router();

const getDemo = require('./getDemo');
const getDemoId = require('./getDemoId');

demos.route('/:demoId')
    .get(getDemoId)
    .all((req, res, next) => {
        return next();
    });

demos.route('/')
    .get(getDemo)
    .all((req, res, next) => {
        return next();
    });

module.exports = demos;