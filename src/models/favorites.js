'use strict';
module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define('favorites', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER(11),
        },
        locationId: {
            type: DataTypes.INTEGER(11),
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    });
    return Favorites;
};
