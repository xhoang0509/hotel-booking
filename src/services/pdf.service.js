const PDFDocument = require('pdfkit');
const fs = require('fs');
const writeLog = require('../logger');
const { getAge } = require('../helper/Date.helper');
const { formattedPriceEN } = require('../helper/Price.helper');
const path = require('path');

const fontFile = path.join(__dirname, '../public/font/open-sans/OpenSans-Regular.ttf');
const vietnameseFont = fs.readFileSync(fontFile);

function createPdfFile(data) {
    try {
        const { id, user, price, createdAt, room } = data;
        const { firstName, lastName, birthday, email, phone } = user;
        const age = birthday ? getAge(birthday) : '';
        const doc = new PDFDocument({
            font: fontFile,
        });
        doc.font(vietnameseFont);
        const date = new Date();

        // Set document metadata
        doc.info.Title = 'Bill for Booking Room';
        doc.info.Author = 'DATPHONG.COM';
        doc.info.Subject = 'Bill';
        doc.info.Creator = 'Datphong.com';

        // Add bill header
        doc.fontSize(18).text(`Hóa đơn đặt phòng #${data.bookingId}`, { align: 'center' });
        doc.moveDown();

        // Add customer details
        doc.fontSize(14).text('Thông tin khách hàng', { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`Tên: ${firstName} ${lastName}`);
        doc.fontSize(12).text(`Tuổi: ${age}`);
        doc.fontSize(12).text(`Email: ${email}`);
        doc.fontSize(12).text(`Số điện thoại: ${phone ? phone : ''}`);
        doc.moveDown();

        // Add item details
        doc.fontSize(14).text('Thông tin phòng', { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`Tên phòng: ${room.name}`);
        doc.fontSize(12).text('Số giường: ' + room.bed);
        doc.fontSize(12).text('Chi tiết giường: ' + room.bedDetail);
        doc.fontSize(12).text('Mô tả: ' + room.description);
        doc.moveDown();

        // Add billing details
        doc.fontSize(14).text('Thông tin hóa đơn', { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`Booking ID: #${data.bookingId}`);
        doc.fontSize(12).text(`Ngày: ${createdAt.toLocaleDateString()}`);
        doc.fontSize(12).text(`Thời gian: ${createdAt.toLocaleTimeString()}`);
        doc.fontSize(12).text(`Số tiền: ${formattedPriceEN(price)} VND`);
        doc.moveDown();

        // Add footer
        doc.fontSize(10).text('Cảm ơn quý khách đã đặt phòng!', { align: 'center' });
        doc.fontSize(10).text('DATPHONG.COM - 2023', { align: 'center' });

        // Save the document
        doc.pipe(fs.createWriteStream(path.join(__dirname, `../public/pdf/bill-${data.id}.pdf`)));
        doc.end();
    } catch (e) {
        writeLog(__filename, 'createPdfFile', e.message, 'FAILED');
    }
}

module.exports = {
    createPdfFile,
};
