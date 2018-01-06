const models = require('../models');
const sequelize = models.sequelize;

const create = async (ipAddress, deviceHeight, deviceWidth, screenHeight, screenWidth) => {
    let session = await models.Session.create({
        ipAddress: ipAddress,
        deviceHeight: deviceHeight,
        deviceWidth: deviceWidth,
        screenHeight: screenHeight,
        screenWidth: screenWidth,
    });

    return session;
};

const get = async (sessionId) => {
    let session = await models.Session.findOne({
        where: {
            id: sessionId
        },
        include: [
            {
                model: models.Journey
            }
        ]
    });

    return session;
};

const getDeviceResolutions = async () => {
    let resolutions = await models.Session.findAll({
        attributes: ['deviceHeight', 'deviceWidth', [sequelize.fn('COUNT', sequelize.col('*')), 'Count']],
        group: ['deviceHeight', 'deviceWidth'],
        order: [[sequelize.fn('COUNT', sequelize.col('*')), 'DESC']]
    });

    return resolutions;
};

const getLocations = async () => {
    let locations = await models.Session.findAll({
        attributes: ['location', [sequelize.fn('ARRAY_AGG', sequelize.fn('DISTINCT', sequelize.col('ipAddress'))), 'ips']],
        group: ['location']
    });

    return locations;
};

const getScreenResolutions = async () => {
    let resolutions = await models.Session.findAll({
        attributes: ['screenHeight', 'screenWidth', [sequelize.fn('COUNT', sequelize.col('*')), 'Count']],
        group: ['screenHeight', 'screenWidth'],
        order: [[sequelize.fn('COUNT', sequelize.col('*')), 'DESC']]
    });

    return resolutions;
};

const getVisitors = async () => {
    let visitors = await models.Session.findAll({
        attributes: ['ipAddress', [sequelize.fn('COUNT', sequelize.col('*')), 'Count']],
        group: ['ipAddress'],
        order: [[sequelize.fn('COUNT', sequelize.col('*')), 'DESC']]
    });

    return visitors;
};

const update = async (sessionId, updateParams) => {
    let [affectedRows, sessions] = await models.Session.update(
        updateParams,
        {
            returning: true,
            where: {
                id: sessionId
            }
        }
    );

    if (affectedRows == 0) {
        return null;
    }

    return sessions[0];
};

module.exports = {
    create,
    get,
    getDeviceResolutions,
    getLocations,
    getScreenResolutions,
    getVisitors,
    update
};