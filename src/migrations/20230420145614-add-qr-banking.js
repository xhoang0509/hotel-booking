'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('locations', 'qr_banking', {
            type: Sequelize.DataTypes.STRING,
            defaultValue:
                'https://firebasestorage.googleapis.com/v0/b/datn-2023-2d1eb.appspot.com/o/images%2Fbanking.jpg?alt=media&token=f19b9a99-6a34-4e0a-87fa-52ba9b6cd90d',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColmun('locations', 'qr_banking');
    },
};
