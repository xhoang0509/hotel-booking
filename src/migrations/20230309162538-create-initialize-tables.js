'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.createTable(
                    'users',
                    {
                        id: {
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                            type: Sequelize.INTEGER(11),
                        },
                        email: {
                            allowNull: false,
                            unique: true,
                            type: Sequelize.STRING(100),
                        },
                        password: {
                            allowNull: false,
                            type: Sequelize.STRING(100),
                        },
                        firstName: {
                            type: Sequelize.STRING(300),
                            allowNull: true,
                        },
                        lastName: {
                            type: Sequelize.STRING(300),
                            allowNull: false,
                        },
                        phone: {
                            type: Sequelize.INTEGER(11),
                        },
                        birthday: {
                            type: Sequelize.DATE,
                        },
                        nationality: {
                            type: Sequelize.STRING(100),
                        },
                        gender: {
                            type: Sequelize.STRING(20),
                        },
                        genius: {
                            type: Sequelize.INTEGER(11),
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
            ]);
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable('initialize-tables');
    },
};
