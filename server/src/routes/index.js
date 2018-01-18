const routes = require('express').Router();

const demos = require('./demos');
const frontEnd = require('./frontEnd');
const resources = require('./resources');
const services = require('./services');

// Normal Routes.
routes.use('/demos', demos);
routes.use('/resources', resources);
routes.use('/services', services);

// Non-API Route, to be handled by Statics.
routes.use('/', frontEnd);

// Error Route.
routes.route('*')
    .all((req, res, next) => {
        return res
            .status(404)
            .json({
                message: 'Not Found'
            });
    });

module.exports = routes;