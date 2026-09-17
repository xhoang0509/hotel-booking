const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(emailTo, subject, text) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || `Datphong.com <${process.env.EMAIL_USER}>`,
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
