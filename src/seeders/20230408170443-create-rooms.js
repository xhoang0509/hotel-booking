'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('rooms', [
            {
                name: 'Tầng 1',
                bed: 2,
                bedDetail: 'Giường đôi',
                description: 'Miễn phí khi ghép giường',
                price: 1000000,
                fromUseTime: '2023-04-08 10:51:44',
                toUseTime: '2023-04-12 10:51:44',
                locationId: 1,
            },
            {
                name: 'Tầng 1',
                bed: 2,
                bedDetail: 'Giường đôi',
                description: 'Miễn phí khi ghép giường',
                price: 1000000,
                fromUseTime: '2023-04-08 10:51:44',
                toUseTime: '2023-04-12 10:51:44',
                locationId: 1,
            },
            {
                name: 'Tầng 2',
                bed: 2,
                bedDetail: 'Giường đôi',
                description: 'Miễn phí khi ghép giường',
                price: 1000000,
                fromUseTime: '2023-04-08 10:51:44',
                toUseTime: '2023-04-12 10:51:44',
                locationId: 1,
            },
            {
                name: 'Tầng 3',
                bed: 2,
                bedDetail: 'Giường đôi',
                description: 'Miễn phí khi ghép giường',
                price: 1000000,
                fromUseTime: '2023-04-08 10:51:44',
                toUseTime: '2023-04-12 10:51:44',
                locationId: 1,
            },
            {
                name: 'Tầng 1',
                bed: 2,
                bedDetail: 'Giường đôi',
                description: 'Miễn phí khi ghép giường',
                price: 1000000,
                fromUseTime: '2023-04-08 10:51:44',
                toUseTime: '2023-04-12 10:51:44',
                locationId: 2,
            },
            {
                name: 'Tầng 1',
                bed: 2,
                bedDetail: 'Giường đôi',
                description: 'Miễn phí khi ghép giường',
                price: 1000000,
                fromUseTime: '2023-04-08 10:51:44',
                toUseTime: '2023-04-12 10:51:44',
                locationId: 2,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {},
};
