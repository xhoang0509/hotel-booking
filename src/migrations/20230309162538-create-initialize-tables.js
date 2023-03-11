'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.createTable('photos',
                    {
                        id: {
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                            type: Sequelize.INTEGER(11),
                        },
                        href: {
                            type: Sequelize.TEXT,
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                        },
                    }
                ),
                queryInterface.createTable('users',
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
                        images: {
                            type: Sequelize.TEXT,
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
                queryInterface.createTable('categories',
                    {
                        id: {
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                            type: Sequelize.INTEGER(11),
                        },
                        name: {
                            allowNull: false,
                            type: Sequelize.STRING(100),
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
                queryInterface.createTable('countries',
                    {
                        id: {
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                            type: Sequelize.INTEGER(11),
                        },
                        name: {
                            allowNull: false,
                            type: Sequelize.STRING(100),
                        },
                        image: {
                            allowNull: true,
                            type: Sequelize.TEXT,
                        },
                        categoryId: {
                            type: Sequelize.INTEGER(11),
                            references: {
                                model: {
                                    tableName: "categories"
                                },
                                key: "id"
                            },
                            allowNull: false
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
                        transaction: t
                    }
                ),
                queryInterface.createTable('cities',
                    {
                        id: {
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                            type: Sequelize.INTEGER(11),
                        },
                        name: {
                            allowNull: false,
                            type: Sequelize.STRING(100),
                        },
                        image: {
                            allowNull: true,
                            type: Sequelize.TEXT,
                        },
                        countryId: {
                            allowNull: false,
                            type: Sequelize.INTEGER(11),
                            references: {
                                model: {
                                    tableName: 'countries',
                                },
                                key: 'id',
                            }
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
                        transaction: t
                    }
                )
            ]);
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable('initialize-tables');
    },
};
