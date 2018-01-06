const moment = require('moment');

const models = require('../models');
const sequelize = models.sequelize;

const create = async (sessionId, path, active = true, start = moment(), end = moment()) => {
    let journey = await models.Journey.create({
        SessionId: sessionId,
        active: active,
        path: path,
        start: start,
        end: end
    });

    return journey;
};

const finish = async (journeyId) => {
    let [affectedRows, journeys] = await models.Journey.update(
        {
            active: false,
            end: moment()
        },
        {
            returning: true,
            where: {
                id: journeyId,
                active: true
            }
        }
    );

    if (affectedRows == 0) {
        return null;
    }

    return journeys[0];
};

module.exports = {
    create,
    finish
};