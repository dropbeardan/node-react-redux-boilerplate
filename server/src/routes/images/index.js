const images = require('express').Router();

const getImage = require('./getImage');

images.route('/:imageId')
    .get(getImage)
    .all((req, res, next) => {
        next();
    });

module.exports = images;