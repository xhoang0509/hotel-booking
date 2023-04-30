const path = require('path');
const fs = require('fs');
const writeLog = require('../logger');
const { createPdfFile } = require('../services/pdf.service');
const bookings = require('../models').bookings;
const rooms = require('../models').rooms;
const users = require('../models').users;

async function createPdf(req, res) {
    let code = 200;
    let result = {
        status: false,
        message: 'OK',
    };

    try {
        const { id } = req.params;
        const booking = await bookings.findOne({
            where: { id: id },
            include: [users, rooms],
        });
        createPdfFile(booking);
        result.status = true;
        result.message = 'OK';
        result.booking = booking;
    } catch (e) {
        writeLog(__filename, 'createPdfFile', e.message, 'FAILED');
        code = 500;
        result.status = false;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

async function sendPdf(req, res) {
    try {
        const { id } = req.params;
        const filePath = path.join(__dirname, `../public/pdf/bill-${id}.pdf`);
        if (fs.existsSync(filePath)) {
            res.contentType('application/pdf');
            res.sendFile(filePath);
        } else {
            writeLog(__filename, 'sendPdf', 'file not found', 'FAILED');
            res.status(400).json({ status: false, message: 'file not found' });
        }
    } catch (e) {
        writeLog(__filename, 'sendPdf', e.message, 'FAILED');
        res.status(500).json({ status: false, message: e.message });
    }
}

module.exports = {
    createPdf,
    sendPdf,
};
