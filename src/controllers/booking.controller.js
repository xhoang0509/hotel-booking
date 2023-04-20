const writeLog = require('../logger');

const bookings = require('../models').bookings;
const users = require('../models').users;
const locations = require('../models').locations;

async function booking(req, res) {
    let code = 200;
    let result = {
        status: false,
        message: '',
    };
    try {
        const {
            userId,
            locationId,
            firstName,
            lastName,
            email,
            price,
            checkInDate,
            checkOutDate,
            paymentMethod,
            paymentStatus
        } = req.body;
        if (userId && locationId) {
            const booking = await bookings.create({
                userId,
                locationId,
                firstName,
                lastName,
                email,
                price,
                checkInDate,
                checkOutDate,
                paymentMethod,
                paymentStatus
            });
            result.booking = booking;
            result.status = true;
        } else {
            result.message = 'Missing userId or locationId';
        }
    } catch (e) {
        writeLog(__filename, 'booking', e.message, 'FAILED');
        code = 500;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

async function getAll(req, res) {
    let code = 200;
    let result = {
        status: false,
        message: '',
    };
    try {
        const bookingDB = await bookings.findAll({
            include: users,
            include: locations,
        });
        result.bookings = bookingDB;
        result.status = true;
    } catch (e) {
        writeLog(__filename, 'getAll', e.message, 'FAILED');
        code = 500;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

async function getBookingByUser(req, res) {
    let code = 200;
    let result = {
        status: false,
        message: '',
    };
    try {
        const { id } = req.params;
        const bookingDB = await bookings.findAll({
            where: { userId: id },
            include: users,
            include: locations,
        });
        result.bookings = bookingDB;
        result.status = true;
    } catch (e) {
        writeLog(__filename, 'getAll', e.message, 'FAILED');
        code = 500;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

module.exports = {
    booking,
    getAll,
    getBookingByUser,
};
