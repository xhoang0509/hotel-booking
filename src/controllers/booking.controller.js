const writeLog = require('../logger');

const bookings = require('../models').bookings;
const rooms = require('../models').rooms;
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
            roomId,
            locationId,
            firstName,
            lastName,
            email,
            price,
            checkInDate,
            checkOutDate,
            paymentMethod,
            paymentStatus,
        } = req.body;
        if (userId && roomId) {
            const booking = await bookings.create({
                userId,
                roomId,
                locationId,
                firstName,
                lastName,
                email,
                price,
                checkInDate,
                checkOutDate,
                paymentMethod,
                paymentStatus,
            });
            result.booking = booking;
            result.status = true;
        } else {
            result.message = 'Missing userId or roomId';
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
            include: [users, locations, rooms],
            order: [['createdAt', 'DESC']],
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

async function getOne(req, res) {
    let code = 200;
    let result = {
        status: false,
        message: '',
    };
    try {
        const { id } = req.params;
        const booking = await bookings.findOne({
            where: { id: id },
            include: [users, locations],
        });
        result.booking = booking;
        result.message = 'OK';
        result.status = true;
    } catch (e) {
        writeLog(__filename, 'getOne', e.message, 'FAILED');
        code = 500;
        result.message = e.message;
    }
    res.status(code).json(result);
}

async function update(req, res) {
    let code = 200;
    let result = {
        status: false,
        message: '',
    };
    try {
        const { id } = req.params;
        const booking = await bookings.findOne({
            where: { id: id },
            include: [users, locations],
        });
        if (booking) {
            const { checkInDate, checkOutDate } = req.body;
            const booking = await bookings.update(
                { checkInDate, checkOutDate },
                { where: { id: id } }
            );
            result.booking = booking;
            result.message = 'Cập nhật thông tin thành công!';
            result.status = true;
        } else {
            code = 401;
            result.message = 'Booking not found';
            result.status = false;
        }
    } catch (e) {
        writeLog(__filename, 'getOne', e.message, 'FAILED');
        code = 500;
        result.message = e.message;
    }
    res.status(code).json(result);
}

module.exports = {
    booking,
    getAll,
    getOne,
    update,
    getBookingByUser,
};
