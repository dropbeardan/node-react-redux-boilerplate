const services = require('express').Router({ mergeParams: true });

const proxyRequest = require('./proxyRequest');

services.route('/*')
    .all(proxyRequest);

module.exports = services;