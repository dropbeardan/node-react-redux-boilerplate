const express = require('express');
const path = require('path');

const routeWrapper = require('../../helpers/routeWrapper');

const requiredFields = [];

const getStatics = (req, res, next) => {
    let appPath = path.join(req.app.get('staticDir'), 'app');

    return express.static(appPath)(req, res, next);
};

module.exports = routeWrapper(requiredFields, getStatics);