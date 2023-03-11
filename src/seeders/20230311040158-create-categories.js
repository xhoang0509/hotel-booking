'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: "Bãi biển",
        createdAt: new Date()
      },
      {
        id: 2,
        name: "Thiên nhiên",
        createdAt: new Date()
      },
      {
        id: 3,
        name: "Thành phố",
        createdAt: new Date()
      },
      {
        id: 4,
        name: "Lãng mạng",
        createdAt: new Date()
      },
      {
        id: 5,
        name: "Thư giãn",
        createdAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
