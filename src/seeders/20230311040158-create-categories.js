'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('categories', [
            {
                id: 1,
                name: 'Bãi biển',
                image: "https://firebasestorage.googleapis.com/v0/b/datn-2023-2d1eb.appspot.com/o/images%2Fcach-kiem-tien-online-cho-hoc-sinh-tai-nha.jpg82db36b2-ca10-434d-8f1c-b0db3170f8ca?alt=media&token=60870ed5-8864-48c0-a459-7750c999bcd4",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Thiên nhiên',
                image: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: 'Thành phố',
                image: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/100235855.jpeg?k=61ef6692e05b5971e2e8dc75687f844e6d0ad295a9a5ace17f7c713f167e61b5&o=",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: 'Lãng mạng',
                image: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: 'Thư giãn',
                image: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/100235855.jpeg?k=61ef6692e05b5971e2e8dc75687f844e6d0ad295a9a5ace17f7c713f167e61b5&o=",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        await queryInterface.bulkInsert('countries', [
            {
                id: 1,
                name: 'Việt Nam',
                image: '',
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        await queryInterface.bulkInsert('cities', [
            {
                id: 1,
                name: 'Hà Nội',
                image: 'https://firebasestorage.googleapis.com/v0/b/datn-2023-2d1eb.appspot.com/o/images%2F688853.jpgcc9760b8-8ac8-4ff7-8721-e2f4b74594c2?alt=media&token=8893c745-61c5-4533-b4bd-0ccef91a0dea',
                countryId: 1,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Đà Nẵng',
                image: 'https://r-xx.bstatic.com/xdata/images/city/170x136/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=',
                countryId: 1,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: 'Huế',
                image: 'https://q-xx.bstatic.com/xdata/images/city/170x136/688886.jpg?k=91c47e49d89f3a4c2408a360bbbe8b08d11e35e3d6d253c7efb27b5ca4d40a61&o=',
                countryId: 1,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: 'Nha Trang',
                image: 'https://q-xx.bstatic.com/xdata/images/city/170x136/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=',
                countryId: 1,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: 'Đà Lạt',
                image: 'https://q-xx.bstatic.com/xdata/images/city/170x136/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=',
                countryId: 1,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
