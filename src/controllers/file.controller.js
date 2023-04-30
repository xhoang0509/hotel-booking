const writeLog = require('../logger');
const { createPdfFile } = require('../services/pdf.service');
const bookings = require('../models').bookings;
const rooms = require('../models').rooms;
const users = require('../models').users;

async function createPdf(req, res) {
    let code = 200;
    let result = {
        success: false,
        message: 'OK',
    };

    try {
        const { id } = req.params;
        const booking = await bookings.findOne({
            where: { id: id },
            include: [users, rooms],
        });
        createPdfFile(booking);
        result.success = true;
        result.message = 'OK';
        result.booking = booking;
    } catch (e) {
        writeLog(__filename, 'createPdfFile', e.message, 'FAILED');
        code = 500;
        result.success = false;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

module.exports = {
    createPdf,
};
