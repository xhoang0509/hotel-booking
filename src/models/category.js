'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('categories', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        images: DataTypes.STRING,
    });
    return Category;
};
