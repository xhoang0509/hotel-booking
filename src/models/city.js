'use strict';
module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('cities', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(100),
        },
        images: {
            type: DataTypes.TEXT,
        },
        countryId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'countries',
                key: 'id'
            }
        },
    });
    return City;
};
