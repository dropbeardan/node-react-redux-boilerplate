const Model = (sequelize, DataTypes) => {

    const Journey = sequelize.define('Journey', {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        active: { type: DataTypes.BOOLEAN, allowNull: false },
        path: { type: DataTypes.STRING, allowNull: false },
        start: { type: DataTypes.DATE, allowNull: false },
        end: { type: DataTypes.DATE, allowNull: false }
    });

    Journey.associate = (models) => {
        Journey.belongsTo(models.Session, {
            foreignKey: 'SessionId'
        });
    };

    return Journey;
};

module.exports = Model;