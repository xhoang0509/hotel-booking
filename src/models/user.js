'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(100),
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        firstName: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(100),
        },
        birthday: {
            type: DataTypes.DATE,
        },
        nationality: {
            type: DataTypes.STRING(100),
        },
        gender: {
            type: DataTypes.STRING(20),
        },
        address: {
            type: DataTypes.STRING(300),
        },
        genius: {
            type: DataTypes.INTEGER(11),
        },
        images: {
            type: DataTypes.TEXT,
        },
    });
    return User;
};
