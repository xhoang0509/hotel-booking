'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('bookings', 'firstName', {
            type: Sequelize.DataTypes.TEXT,
        });
        await queryInterface.addColumn('bookings', 'lastName', {
            type: Sequelize.DataTypes.TEXT,
        });
        await queryInterface.addColumn('bookings', 'email', {
            type: Sequelize.DataTypes.TEXT,
        });
        await queryInterface.addColumn('bookings', 'status', {
            type: Sequelize.ENUM('not_check_in', 'check_in', 'check_out', 'rejected'),
            defaultValue: 'not_check_in',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('bookings', 'firstName');
        await queryInterface.removeColumn('bookings', 'lastName');
        await queryInterface.removeColumn('bookings', 'email');
        await queryInterface.removeColumn('bookings', 'status');
    },
};
