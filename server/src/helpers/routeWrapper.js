const areFieldsProvided = require('./areFieldsProvided');

const routeWrapper = (requiredFields, routeFn) => {
    return async (req, res, next) => {
        try {
            if (!areFieldsProvided(requiredFields, req.body)) {
                return res
                    .status(400)
                    .json({
                        message: 'Insufficient Details Provided.'
                    });
            }

            return await routeFn(req, res, next);
        } catch (err) {
            console.log(err);

            return res
                .status(500)
                .json({
                    message: 'Internal Server Error.'
                });
        }
    };
};

module.exports = routeWrapper;