const path = require('path');

const routeWrapper = require('../../helpers/routeWrapper');

const requiredFields = [];

const renderIndex = (req, res, next) => {
    let index = path.join(req.app.get('staticDir'), 'app', 'index.html');

    return res.sendFile(index);
};

module.exports = routeWrapper(requiredFields, renderIndex);