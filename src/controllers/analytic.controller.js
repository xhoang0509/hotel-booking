const { Op } = require('sequelize');
const db = require('../models');

const writeLog = require('../logger');
const users = require('../models').users;
const bookings = require('../models').bookings;
const locations = require('../models').locations;
const rooms = require('../models').rooms;

async function getAnalytic(req, res) {
    let code = 200;
    const result = {
        status: false,
        message: '',
    };
    try {
        const data = {};
        const countUser = await users.count();
        const countBooking = await bookings.count();
        const countLocation = await locations.count();
        const countRoom = await rooms.count();
        const revenue = await bookings.sum('price');
        data.user = countUser;
        data.booking = countBooking;
        data.location = countLocation;
        data.room = countRoom;
        data.revenue = revenue;
        result.status = true;
        result.message = 'OK';
        result.payload = data;
    } catch (e) {
        writeLog(__filename, 'getAnalytic', e.message, 'FAILED');
        code = 500;
        result.status = true;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

async function lineChart(req, res) {
    let code = 200;
    const result = {
        status: false,
        message: '',
    };
    try {
        const result = await bookings.findAll({
            attributes: [
                [db.sequelize.fn('MONTH', db.sequelize.col('createdAt')), 'month'],
                [db.sequelize.fn('SUM', db.sequelize.col('price')), 'sum_price'],
            ],
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date() - 365 * 24 * 60 * 60 * 1000), // Get bookings within the last year
                },
            },
            group: [db.sequelize.fn('MONTH', db.sequelize.col('createdAt'))],
            raw: true,
        });
        result.result = result;
        result.status = true;
        result.message = 'OK';
    } catch (e) {
        writeLog(__filename, 'getAnalytic', e.message, 'FAILED');
        code = 500;
        result.status = true;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

module.exports = {
    getAnalytic,
    lineChart,
};
