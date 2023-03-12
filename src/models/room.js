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
        bedDetal: {
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
        }
    });
    return Room;
};
