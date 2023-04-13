'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'status', {
            type: Sequelize.ENUM('draft', 'active', 'inactive'),
            defaultValue: 'draft',
        });
        await queryInterface.addColumn('users', 'otp', {
            type: Sequelize.DataTypes.INTEGER,
        });
        await queryInterface.addColumn('users', 'otp_timestamp', {
            type: Sequelize.DataTypes.BIGINT,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('users', 'status');
        await queryInterface.removeColumn('users', 'otp');
        await queryInterface.removeColumn('users', 'otp_timestamp');
    },
};
