const routeWrapper = require('../../helpers/routeWrapper');

const requiredFields = [];

const getDemo = (req, res) => {
    return res
        .status(200)
        .json({
            message: 'OK'
        });
};

module.exports = routeWrapper(requiredFields, getDemo);