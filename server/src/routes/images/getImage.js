const path = require('path');

const routeWrapper = require('../../helpers/routeWrapper');

const requiredFields = [];

const getImage = async (req, res, next) => {
    let options = {
        root: path.join(req.app.get('staticDir'), 'images')
    };

    return res.sendFile(req.params.imageId, options, (err) => {
        if (err && err.status == 404) {
            return res
                .status(404)
                .json({ message: 'Not Found.' });
        }

        if (err) {
            throw err;
        }
    });
};

module.exports = routeWrapper(requiredFields, getImage);