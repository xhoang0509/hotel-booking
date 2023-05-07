'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `UPDATE locations SET qr_banking = "https://firebasestorage.googleapis.com/v0/b/datn-2023-2d1eb.appspot.com/o/images%2FScreenshot_3.png?alt=media&token=a956ba1a-5e13-4904-a6b1-3109c0d48391";`
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
