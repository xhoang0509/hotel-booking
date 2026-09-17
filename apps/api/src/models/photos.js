'use strict';
module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('photos', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        href: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
    });
    return Photo;
};
