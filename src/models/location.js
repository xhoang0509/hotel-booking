'use strict';
module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('locations', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
        },
        address: {
            type: DataTypes.TEXT,
        },
        images: {
            type: DataTypes.TEXT,
            get() {
                return JSON.parse(this.getDataValue('images'));
            },
        },
        thumbnail: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        phone: {
            type: DataTypes.STRING(100),
        },
        cityId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'cities',
                key: 'id',
            },
        },
    });
    return Location;
};
