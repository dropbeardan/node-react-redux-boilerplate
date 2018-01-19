const axios = require('axios');

const routeWrapper = require('../../helpers/routeWrapper');

const requiredFields = [];

const services = [
    { prefix: 'subdomain.example.com', baseURL: 'http://localhost:25001' }
];

const proxyRequest = async (req, res, next) => {

    let service = services.find((service) => {
        return (
            (req.headers.referer && req.headers.referer.indexOf(service.prefix) !== -1) ||
            (req.headers.origin && req.headers.origin.indexOf(service.prefix) !== -1) ||
            (req.headers.host && req.headers.host.indexOf(service.prefix) !== -1)
        );
    });

    if (!service) {
        return next();
    }

    try {
        if (req.path.indexOf('/resources') == 0) {
            let dataStream = [];

            // Enable stream mode for resource requests to handle streaming file transfers.
            await axios({
                method: req.method,
                baseURL: service.baseURL,
                url: req.path,
                headers: req.headers,
                data: req.body,
                responseType: 'stream'
            })
                .then((response) => {
                    response.data.on('data', (chunk) => {
                        dataStream.push(chunk);
                    });

                    response.data.on('end', () => {
                        return res
                            .status(response.status)
                            .set(response.headers)
                            .send(Buffer.concat(dataStream));
                    });
                });
        } else {
            let response = await axios({
                method: req.method,
                baseURL: service.baseURL,
                url: req.path,
                headers: req.headers,
                data: req.body
            });

            return res
                .status(response.status)
                .set(response.headers)
                .send(typeof (response.data) == 'number' ? String(response.data) : response.data);
        }

    } catch (err) {
        if (err.response) {
            return res
                .status(err.response.status)
                .set(err.response.headers)
                .send(err.response.data);
        }

        throw err;
    }
};

module.exports = routeWrapper(requiredFields, proxyRequest);