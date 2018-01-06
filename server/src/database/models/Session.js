const Model = (sequelize, DataTypes) => {

    const Session = sequelize.define('Session', {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        ipAddress: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, defaultValue: '{}' },
        deviceWidth: { type: DataTypes.INTEGER, allowNull: false },
        deviceHeight: { type: DataTypes.INTEGER, allowNull: false },
        screenWidth: { type: DataTypes.INTEGER, allowNull: false },
        screenHeight: { type: DataTypes.INTEGER, allowNull: false }
    });

    Session.associate = (models) => {
        Session.hasMany(models.Journey, {
            foreignKey: 'SessionId'
        });
    }

    return Session;
};

module.exports = Model;