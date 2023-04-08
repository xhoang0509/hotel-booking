const writeLog = require('../logger');
const { sendEmail } = require('../services/email.service');

async function send(req, res) {
    let result = {
        code: 500,
        data: {
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        },
    };
    try {
        const { emailTo, subject, text } = req.body;
        if (!emailTo || !subject || !text) {
            result = {
                code: 400,
                data: {
                    status: false,
                    message: 'Missing emailTo, subject or text!',
                },
            };
        } else {
            let res = await sendEmail(emailTo, subject, text);
            if (res.error) {
                result = {
                    code: 200,
                    data: {
                        status: false,
                        message: 'Email sent : ' + emailTo + ' ERROR: ' + res.error,
                    },
                };
            } else {
                console.log('Email sent: ' + res.response);
                result = {
                    code: 200,
                    data: {
                        status: true,
                        message: 'Email sent to: ' + emailTo,
                    },
                };
            }
        }
    } catch (e) {
        writeLog(__filename, 'email.controller.login', e.message, "FAILED");
        result = {
            code: 500,
            data: {
                status: false,
                message: 'INTERNAL_SERVER_ERROR ' + e.message,
            },
        };
    } finally {
        res.status(result.code).json({ data: result.data });
    }
}

module.exports = {
    send,
};
