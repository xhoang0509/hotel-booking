'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('rooms', 'userBookings', {
            type: Sequelize.DataTypes.TEXT,
            defaultValue: '',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('rooms', 'userBookings');
    },
};
