'use strict';
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('rooms', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
        },
        bed: {
            type: DataTypes.INTEGER,
        },
        bedDetail: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        fromUseTime: {
            type: DataTypes.DATE,
        },
        toUseTime: {
            type: DataTypes.DATE,
        },
        locationId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'locations',
                key: 'id',
            },
        },
    });
    return Room;
};
