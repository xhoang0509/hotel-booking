const path = require('path');

function writeLog(file, func, message, status) {
    const now = new Date();
    const date = now.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const time = now.toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const log = {
        filename: `${path.basename(file)}`,
        caller: `${func}`,
        message: message instanceof Error ? message.stack : message,
        time: `${date} ${time}`,
        status: `${status}`
    };
    console.log(JSON.stringify(log));
}

module.exports = writeLog;
