'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('locations', 'checkInDate');
        await queryInterface.removeColumn('locations', 'checkOutDate');
    },

    async down(queryInterface, Sequelize) {},
};
