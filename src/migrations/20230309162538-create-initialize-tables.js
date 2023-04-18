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
                            type: Sequelize.STRING(300),
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
                        address: {
                            type: Sequelize.STRING(300),
                        },
                        genius: {
                            type: Sequelize.INTEGER(11),
                        },
                        images: {
                            type: Sequelize.TEXT,
                        },
                        status: {
                            type: Sequelize.ENUM('draft', 'active', 'inactive'),
                            defaultValue: 'draft',
                        },
                        otp: {
                            type: Sequelize.DataTypes.INTEGER,
                        },
                        otp_timestamp: {
                            type: Sequelize.DataTypes.BIGINT,
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
                queryInterface.createTable(
                    'categories',
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
                        images: {
                            type: Sequelize.DataTypes.STRING,
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
                queryInterface.createTable(
                    'countries',
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
                                    tableName: 'categories',
                                },
                                key: 'id',
                            },
                            allowNull: false,
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
                queryInterface.createTable(
                    'cities',
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
                            },
                        },
                        categoryId: {
                            allowNull: false,
                            type: Sequelize.INTEGER(11),
                            references: {
                                model: {
                                    tableName: 'categories',
                                },
                                key: 'id',
                            },
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
                queryInterface.createTable(
                    'locations',
                    {
                        id: {
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                            type: Sequelize.INTEGER(11),
                        },
                        name: {
                            type: Sequelize.TEXT,
                        },
                        address: {
                            type: Sequelize.TEXT,
                        },
                        images: {
                            type: Sequelize.TEXT,
                        },
                        thumbnail: {
                            type: Sequelize.TEXT,
                        },
                        description: {
                            type: Sequelize.TEXT,
                        },
                        phone: {
                            type: Sequelize.STRING(100),
                        },
                        oldPrice: Sequelize.DataTypes.INTEGER,
                        newPrice: Sequelize.DataTypes.INTEGER,
                        checkInDate: Sequelize.DATE,
                        checkOutDate: Sequelize.DATE,
                        convenients: {
                            type: Sequelize.TEXT,
                        },
                        cityId: {
                            allowNull: false,
                            type: Sequelize.INTEGER(11),
                            references: {
                                model: {
                                    tableName: 'cities',
                                },
                                key: 'id',
                            },
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
                queryInterface.createTable(
                    'rooms',
                    {
                        id: {
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                            type: Sequelize.INTEGER(11),
                        },
                        name: {
                            type: Sequelize.TEXT,
                        },
                        bed: {
                            type: Sequelize.INTEGER,
                        },
                        bedDetail: {
                            type: Sequelize.TEXT,
                        },
                        description: {
                            type: Sequelize.TEXT,
                        },
                        oldPrice: {
                            type: Sequelize.FLOAT,
                        },
                        newPrice: {
                            type: Sequelize.FLOAT,
                        },
                        checkInDate: {
                            type: Sequelize.DATE,
                        },
                        checkOutDate: {
                            type: Sequelize.DATE,
                        },
                        images: {
                            type: Sequelize.TEXT,
                        },
                        options: {
                            type: Sequelize.TEXT,
                        },
                        locationId: {
                            type: Sequelize.DataTypes.INTEGER(11),
                            allowNull: false,
                            references: {
                                model: 'locations',
                                key: 'id',
                            },
                        },
                        point: Sequelize.DataTypes.INTEGER,
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
                queryInterface.createTable(
                    'rules',
                    {
                        id: {
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                            type: Sequelize.INTEGER(11),
                        },
                        name: {
                            type: Sequelize.TEXT,
                        },
                        description: {
                            type: Sequelize.TEXT,
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
                queryInterface.createTable(
                    'admins',
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
                            type: Sequelize.STRING(300),
                        },
                        birthday: {
                            type: Sequelize.DATE,
                        },
                        gender: {
                            type: Sequelize.STRING(20),
                        },
                        address: {
                            type: Sequelize.STRING(300),
                        },
                        image: {
                            type: Sequelize.TEXT,
                        },
                        status: {
                            type: Sequelize.STRING(50),
                        },
                        ruleId: {
                            type: Sequelize.INTEGER(11),
                            references: {
                                model: {
                                    tableName: 'rules',
                                },
                                key: 'id',
                            },
                            allowNull: false,
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
                queryInterface.createTable(
                    'bookings',
                    {
                        id: {
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                            type: Sequelize.INTEGER(11),
                        },
                        userId: {
                            type: Sequelize.DataTypes.INTEGER(11),
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                        },
                        locationId: {
                            type: Sequelize.DataTypes.INTEGER(11),
                            references: {
                                model: 'rooms',
                                key: 'id',
                            },
                        },
                        price: {
                            type: Sequelize.DataTypes.DOUBLE,
                        },
                        discount: {
                            type: Sequelize.DataTypes.DOUBLE,
                        },
                        point: {
                            type: Sequelize.DataTypes.DOUBLE,
                        },
                        checkInDate: {
                            type: Sequelize.DataTypes.DATE,
                        },
                        checkOutDate: {
                            type: Sequelize.DataTypes.DATE,
                        },
                        paymentMethod: {
                            type: Sequelize.DataTypes.STRING,
                        },
                        paymentStatus: {
                            type: Sequelize.DataTypes.STRING,
                        },
                        createdAt: {
                            allowNull: false,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                        updatedAt: {
                            allowNull: true,
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                        },
                    },
                    {
                        transaction: t,
                    }
                ),
                queryInterface.createTable(
                    'favorites',
                    {
                        id: {
                            type: Sequelize.DataTypes.INTEGER(11),
                            autoIncrement: true,
                            primaryKey: true,
                        },
                        userId: {
                            type: Sequelize.DataTypes.INTEGER(11),
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                        },
                        locationId: {
                            type: Sequelize.DataTypes.INTEGER(11),
                            references: {
                                model: 'locations',
                                key: 'id',
                            },
                        },
                        createdAt: {
                            type: Sequelize.DataTypes.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
                            allowNull: false,
                        },
                        updatedAt: {
                            type: Sequelize.DataTypes.DATE,
                            defaultValue: Sequelize.DataTypes.NOW,
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
