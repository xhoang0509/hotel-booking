'use strict';
module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('countries', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        image: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        categoryId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
    });
    return Country;
};
