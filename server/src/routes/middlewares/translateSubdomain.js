const translateSubdomain = (req, res, next) => {

    let subdomains = [
        { prefix: 'service.example.com', route: '/api/service' }
    ];

    let subdomain = subdomains.find((subdomain) => {
        return (
            (req.headers.referer && req.headers.referer.indexOf(subdomain.prefix) !== -1) ||
            (req.headers.origin && req.headers.origin.indexOf(subdomain.prefix) !== -1) ||
            (req.headers.host && req.headers.host.indexOf(subdomain.prefix) !== -1)
        );
    });

    if (subdomain) {
        req.path = `${subdomain.route}${req.path}`;
    }

    next();
};

module.exports = translateSubdomain;