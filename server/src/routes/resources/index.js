const resources = require('express').Router();

const getResource = require('./getResource');

resources.route('/:resourceName')
    .get(getResource)
    .all((req, res, next) => {
        next();
    });

module.exports = resources;