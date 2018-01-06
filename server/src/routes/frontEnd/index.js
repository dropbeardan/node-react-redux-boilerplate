const frontEnd = require('express').Router();

const getStatics = require('./getStatics');
const renderIndex = require('./renderIndex');

frontEnd.route('*')
    .get(getStatics)
    .get(renderIndex)
    .all((req, res, next) => {
        next();
    });

module.exports = frontEnd;