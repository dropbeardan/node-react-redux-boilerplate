const path = require('path');

const server = require('./server');

const staticDir = {
    dev: path.join(__dirname, '..', 'mockClient'),
    test: path.join(__dirname, '..', 'client'),
    production: path.join(__dirname, '..', 'client')
};

const app = server(process.env.PORT, staticDir[process.env.NODE_ENV]);