'use strict';
module.exports = (sequelize, DataTypes) => {
    const Rule = sequelize.define('rules', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        description: {
            type: DataTypes.STRING(300),
        }
    });
    return Rule;
};
