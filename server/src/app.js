const fs = require('fs');
const path = require('path');

const server = require('./server');

const staticDir = {
    dev: path.join(__dirname, '..', 'mockClient'),
    test: path.join(__dirname, '..', 'client'),
    production: path.join(__dirname, '..', 'client')
};

// HTTPS TLS options.
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'auth', 'tls', 'private.key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'auth', 'tls', 'origin.certificate.pem'))
};

const app = server(process.env.HTTP_PORT, process.env.HTTPS_PORT, httpsOptions, staticDir[process.env.NODE_ENV]);
