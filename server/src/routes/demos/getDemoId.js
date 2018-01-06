const routeWrapper = require('../../helpers/routeWrapper');

const requiredFields = [];

const getDemoId = (req, res) => {
    return res
        .status(200)
        .json({
            id: req.params.demoId
        });
};

module.exports = routeWrapper(requiredFields, getDemoId);