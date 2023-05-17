const path = require('path');
const fs = require('fs');
const writeLog = require('../logger');
const { createPdfFile } = require('../services/pdf.service');
const bookings = require('../models').bookings;
const rooms = require('../models').rooms;
const users = require('../models').users;
const ExcelJS = require('exceljs');
const { formatDateVN } = require('../helper/Date.helper');
const {
    translateBookingStatus,
    translateBookingPayment,
    translatePaymentMethod,
} = require('../helper/Booking.helper');

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
            const file = fs.createReadStream(filePath);
            const stat = fs.statSync(filePath);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=bill-${id}.pdf`);
            file.pipe(res);
        } else {
            writeLog(__filename, 'sendPdf', 'file not found', 'FAILED');
            res.status(400).json({ status: false, message: 'file not found' });
        }
    } catch (e) {
        writeLog(__filename, 'sendPdf', e.message, 'FAILED');
        res.status(500).json({ status: false, message: e.message });
    }
}

async function createBookingExcel(req, res) {
    let code = 200;
    let result = {
        status: false,
        message: 'OK',
    };

    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        const ids = [];
        const customersName = [];
        const customersEmail = [];
        const checkInDates = [];
        const checkOutDates = [];
        const prices = [];
        const paymentsMethod = [];
        const paymentsStatus = [];
        const roomsStatus = [];
        const data = await bookings.findAll({
            include: [users, rooms],
        });
        for (let i = 0; i < data.length; i++) {
            const ele = data[i];
            ids.push(ele.bookingId);
            customersName.push(`${ele.user.firstName} ${ele.user.lastName}`);
            customersEmail.push(ele.user.email);
            checkInDates.push(formatDateVN(ele.checkInDate));
            checkOutDates.push(formatDateVN(ele.checkOutDate));
            prices.push(ele.price);
            paymentsMethod.push(translatePaymentMethod(ele.paymentMethod));
            paymentsStatus.push(translateBookingPayment(ele.paymentStatus));
            roomsStatus.push(translateBookingStatus(ele.status));
        }

        worksheet.getColumn('A').values = ['ID', ...ids]; // Thêm cột name từ ô A2
        worksheet.getColumn('B').values = ['Tên khách hàng', ...customersName];
        worksheet.getColumn('C').values = ['Email khách hàng', ...customersEmail];
        worksheet.getColumn('D').values = ['Ngày nhận phòng', ...checkInDates];
        worksheet.getColumn('E').values = ['Ngày trả phòng', ...checkOutDates];
        worksheet.getColumn('F').values = ['Giá phòng', ...prices];
        worksheet.getColumn('G').values = ['Hình thức thanh toán', ...paymentsMethod];
        worksheet.getColumn('H').values = ['Trạng thái thanh toán', ...paymentsStatus];
        worksheet.getColumn('I').values = ['Tình trạng phòng', ...roomsStatus];

        const fileOutput = path.join(__dirname, `../public/excel/booking.xlsx`);
        workbook.xlsx
            .writeFile(fileOutput)
            .then(function () {
                console.log('File Excel đã được xuất thành công.');
            })
            .catch(function (error) {
                console.log('Đã xảy ra lỗi:', error);
            });

        result.status = true;
        result.message = 'OK';
    } catch (e) {
        writeLog(__filename, 'createPdfFile', e.message, 'FAILED');
        code = 500;
        result.status = false;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

async function sendBookingExcel(req, res) {
    try {
        const filePath = path.join(__dirname, `../public/excel/booking.xlsx`);
        if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            res.setHeader('Content-Length', stat.size);
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader('Content-Disposition', 'attachment; filename=booking.xlsx');
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
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
    createBookingExcel,
    sendBookingExcel,
};
