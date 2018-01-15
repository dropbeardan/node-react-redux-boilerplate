const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');

const translateSubdomain = require('./routes/middlewares/translateSubdomain');
const routes = require('./routes');

const serverFactory = (httpPort, httpsPort, httpsOptions, staticDir) => {

    let server = express();

    // Cache and load statics directory.
    server.set('staticDir', staticDir);

    server.use(bodyParser.json());
    server.use((err, req, res, next) => {
        if (err instanceof SyntaxError) {
            return res
                .status(400)
                .json({
                    message: 'Invalid JSON supplied.'
                });
        }

        return next();
    });

    // Additional RESPONSE headers to allow for CORS.
    server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");

        // Intercept Pre-Flight OPTIONS request.
        if (req.method == 'OPTIONS') {
            return res
                .status(200)
                .send();
        }

        next();
    });

    // Remap subdomain paths.
    server.use(translateSubdomain);

    server.all('*', routes);

    let httpServer = http.createServer(server);
    httpServer.listen(httpPort, () => {
        console.log(`[${process.env.NODE_ENV}] HTTP Server started @ Port ${httpPort}`);
    });

    let httpsServer = null;

    if (httpsPort && httpsOptions) {
        httpsServer = https.createServer(httpsOptions, server);
        httpsServer.listen(httpsPort, () => {
            console.log(`[${process.env.NODE_ENV}] HTTPS Server started @ Port ${httpsPort}`);
        });
    }

    return {
        http: httpServer,
        https: httpsServer
    };
};

module.exports = serverFactory;
