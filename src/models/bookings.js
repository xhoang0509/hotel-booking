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
        price: {
            type: DataTypes.DOUBLE,
        },
        discount: {
            type: DataTypes.DOUBLE,
        },
        point: {
            type: DataTypes.DOUBLE,
        },
        checkInDate: {
            type: DataTypes.DATE,
        },
        checkOutDate: {
            type: DataTypes.DATE,
        },
        paymentMethod: {
            type: DataTypes.STRING,
        },
        paymentStatus: {
            type: DataTypes.STRING,
        },
        firstName: {
            type: DataTypes.TEXT,
        },
        lastName: {
            type: DataTypes.TEXT,
        },
        email: {
            type: DataTypes.TEXT,
        },
    });
    return UserLocation;
};
