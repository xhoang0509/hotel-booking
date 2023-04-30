'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('bookings', 'bookingId', {
            type: Sequelize.DataTypes.TEXT,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('bookings', 'bookingId');
    },
};
