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
        oldPrice: {
            type: DataTypes.FLOAT,
        },
        newPrice: {
            type: DataTypes.FLOAT,
        },
        checkInDate: {
            type: DataTypes.DATE,
        },
        checkOutDate: {
            type: DataTypes.DATE,
        },
        images: {
            type: DataTypes.TEXT,
            get() {
                return JSON.parse(this.getDataValue('images'));
            }
        },
        options: {
            type: DataTypes.TEXT,
        },
        point: DataTypes.INTEGER,
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
