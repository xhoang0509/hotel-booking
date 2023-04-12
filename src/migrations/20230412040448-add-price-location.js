'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('locations', 'oldPrice', {
        type: Sequelize.DataTypes.BIGINT,
      }),
      queryInterface.addColumn('locations', 'price', {
        type: Sequelize.DataTypes.BIGINT,
      }),
      queryInterface.addColumn('locations', 'fromUseTime', {
        type: Sequelize.DataTypes.DATE,
        defaultValue: null,
      }),
      queryInterface.addColumn('locations', 'toUseTime', {
        type: Sequelize.DataTypes.DATE,
        defaultValue: null,
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('locations', 'oldPrice'),
      queryInterface.removeColumn('locations', 'price'),
      queryInterface.removeColumn('locations', 'fromUseTime'),
      queryInterface.removeColumn('locations', 'toUseTime'),
    ])
  }
};
