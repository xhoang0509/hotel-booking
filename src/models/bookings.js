'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserLocation = sequelize.define('bookings', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'users',
                key: 'id',
            },
        },
        locationId: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'locations',
                key: 'id',
            },
        },
        price: DataTypes.INTEGER(11),
    });
    return UserLocation;
};
