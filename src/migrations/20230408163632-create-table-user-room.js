'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_room', {
      user_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        references: {
          model: 'users',
          key: 'id',
        },
      },
      room_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        references: {
          model: 'rooms',
          key: 'id',
        },
      },
      price: Sequelize.DataTypes.INTEGER(11),
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_room');
  }
};
