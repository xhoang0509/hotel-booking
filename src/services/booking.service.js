const randomstring = require('randomstring');
const { sendEmail } = require('./email.service');
const { bookingSuccessTemplate } = require('../constant/email.const');
const { formatDateVN } = require('../helper/Date.helper');
const { formattedPrice } = require('../helper/Price.helper');

const BookingService = {
    sendMail: async function (user, checkInDate, checkOutDate, price) {
        const check_in_date = formatDateVN(checkInDate);
        const check_out_date = formatDateVN(checkOutDate);
        const bodyEmail = bookingSuccessTemplate
            .split('{{check_in_date}}')
            .join(check_in_date)
            .split('{{check_out_date}}')
            .join(check_out_date)
            .split('{{price}}')
            .join(formattedPrice(price));

        await sendEmail(user.email, 'Thông báo đặt phòng thành công tại Datphong.com', bodyEmail);
    },
};

module.exports = BookingService;
