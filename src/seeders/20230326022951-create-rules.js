'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('rules', [
            {
                id: 1,
                name: 'Quản lý',
                description: 'Đọc, ghi',
            },
            {
                id: 2,
                name: 'Nhân viên',
                description: 'Đọc',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
    },
};
