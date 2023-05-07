const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'scroll0509@gmail.com',
        pass: 'bqolkurhokehdqia',
    },
});

async function sendEmail(emailTo, subject, text) {
    try {
        const mailOptions = {
            from: 'Datphong.com <scroll0509@gmail.com>',
            to: `${emailTo}`,
            subject: `${subject}`,
            text: `${text}`,
        };
        let res = await transporter.sendMail(mailOptions);
        return res;
    } catch (error) {
        return error;
    }
}

module.exports = {
    sendEmail,
};
