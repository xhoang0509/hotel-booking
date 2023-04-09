'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('rooms', 'locationId', {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'locations',
                key: 'id',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('rooms', 'image');
    },
};
