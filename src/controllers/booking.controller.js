const { checkExistRoom } = require('../helper/Date.helper');
const writeLog = require('../logger');
const BookingService = require('../services/booking.service');
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
            bookingId,
            firstName,
            lastName,
            email,
            price,
            checkInDate,
            checkOutDate,
            paymentMethod,
            paymentStatus,
        } = req.body;
        if (userId && roomId && checkInDate && checkOutDate && price) {
            const room = await rooms.findOne({ where: { id: roomId } });
            if (room) {
                const isExitsRoom = checkExistRoom(checkInDate, checkOutDate, room.userBookings);
                if (isExitsRoom) {
                    const data = {
                        bookingId: bookingId,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                    };

                    const bookingsDB = room.userBookings || [];
                    bookingsDB.push(data);
                    room.userBookings = JSON.stringify(bookingsDB);
                    await room.save();

                    const user = await users.findOne({ where: { id: userId } });
                    const booking = await bookings.create({
                        userId,
                        roomId,
                        locationId,
                        bookingId,
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
                    BookingService.sendMail(user, checkInDate, checkOutDate, price);
                } else {
                    result.status = false;
                    result.message = 'Room existed!';
                }
            }
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
            include: [users, locations],
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

async function checkRoom(req, res) {
    let code = 200;
    let result = {
        status: false,
        message: '',
    };
    try {
        const { roomId, checkInDate, checkOutDate } = req.body;
        const roomDB = await rooms.findOne({ where: { id: roomId } });
        if (roomDB) {
            const isExistRoom = checkExistRoom(checkInDate, checkOutDate, roomDB.userBookings);
            if (isExistRoom) {
                result.status = true;
                result.message = 'OK';
            } else {
                result.status = false;
                result.message = 'Phòng đã hết vào ngày ngày!';
            }
        } else {
            result.status = false;
            result.message = 'Room not found!';
        }
    } catch (e) {
        writeLog(__filename, 'checkRoom', e.message, 'FAILED');
        code = 500;
        result.status = false;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

async function checkInOut(req, res) {
    let code = 200;
    let result = {
        status: false,
        message: '',
    };
    try {
        const { id } = req.params;
        const { type } = req.body;
        const bookingDB = await bookings.findOne({ where: { id: id } });
        if (bookingDB) {
            if (type === 'check_in') {
                bookingDB.status = 'check_in';
                await bookingDB.save();
                result.status = true;
                result.message = 'Check in phòng thành công!';
            } else if (type === 'check_out') {
                bookingDB.status = 'check_out';
                await bookingDB.save();
                const room = await rooms.findOne({ where: { id: bookingDB.roomId } });
                let userBookings = room.userBookings || [];
                userBookings = userBookings.filter(
                    (booking) => booking.bookingId !== bookingDB.bookingId
                );
                room.userBookings = JSON.stringify(userBookings);
                await room.save();
                result.status = true;
                result.message = 'Check out phòng thành công!';
            } else if (type === 'rejected') {
                bookingDB.status = 'rejected';
                await bookingDB.save();
                const room = await rooms.findOne({ where: { id: bookingDB.roomId } });
                let userBookings = room.userBookings || [];
                userBookings = userBookings.filter(
                    (booking) => booking.bookingId !== bookingDB.bookingId
                );
                room.userBookings = JSON.stringify(userBookings);
                await room.save();
                result.status = true;
                result.message = 'Hủy đặt phòng thành công!';
            }
        } else {
            result.status = false;
            result.message = 'Booking not found!';
        }
    } catch (e) {
        writeLog(__filename, 'checkRoom', e.message, 'FAILED');
        code = 500;
        result.status = false;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

module.exports = {
    booking,
    getAll,
    getOne,
    update,
    getBookingByUser,
    checkRoom,
    checkInOut,
};
