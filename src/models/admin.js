'use strict';
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('admins', {
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
        gender: {
            type: DataTypes.STRING(20),
        },
        address: {
            type: DataTypes.STRING(300),
        },
        image: {
            type: DataTypes.TEXT,
        },
        ruleId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'rules',
                key: 'id',
            },
        }
    });
    return Admin;
};
