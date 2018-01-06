const axios = require('axios');

const routeWrapper = require('../../helpers/routeWrapper');

const requiredFields = [];

const services = [
    { name: 'demo-server', baseURL: 'http://localhost:10100' }
];

// Proxy request to Service endpoints if registered.
const proxyRequest = async (req, res, next) => {
    let endpoint = services.find((service) => {
        return service.name == req.params.serviceName;
    });

    if (!endpoint) {
        return next();
    }

    try {
        let response = await axios({
            method: req.method,
            baseURL: endpoint.baseURL,
            url: req.path,
            data: req.body
        });

        return res
            .status(response.status)
            .set(response.headers)
            .send(response.data);
    } catch (err) {
        if (err.response) {
            return res
                .status(err.response.status)
                .set(err.response.headers)
                .send(err.response.data);
        }

        return res
            .status(500)
            .json({ message: 'Internal Server Error.' });
    }
};

module.exports = routeWrapper(requiredFields, proxyRequest);