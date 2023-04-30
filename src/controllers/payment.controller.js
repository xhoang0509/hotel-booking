require('dotenv').config();
const crypto = require('crypto');
const querystring = require('qs');
const writeLog = require('../logger');
const sortObject = require('../helper/SortObject');

const { vnp_Version, vnp_Url, vnp_TmnCode, vnp_HashSecret } = process.env;

const secretKey = vnp_HashSecret;

async function createPaymentUrl(req, res, next) {
    try {
        const { amount, bankCode, orderDescription, orderType, language } = req.body;
        let locale = language;
        let orderInfo = orderDescription;
        var ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let vnpUrl = vnp_Url;
        let returnUrl = `${process.env.CLIENT_URL}/booking-history`;

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        var createDate = parseInt(`${year}${month}${day}${hours}${minutes}${seconds}`);
        var orderId = parseInt(`${hours}${minutes}${seconds}`);

        if (locale === null || locale === '') {
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = vnp_Version;
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.status(200).json({
            status: true,
            message: 'Create URL checkout ok',
            redirectUrl: vnpUrl,
        });
    } catch (e) {
        writeLog(__filename, 'createPaymentUrl', e.message, 'FAILED');
        res.status(500).json({ status: false, message: e.message });
    }
}

async function getCodeIpnUrl(req, res, next) {
    try {
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

        if (secureHash === signed) {
            var orderId = vnp_Params['vnp_TxnRef'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
            res.status(200).json({ RspCode: '00', Message: 'success' });
        } else {
            res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
        }
    } catch (e) {
        writeLog(__filename, 'getCodeIpnUrl', e.message, 'FAILED');
        res.status(200).json({
            status: false,
            message: e.message,
        });
    }
}

module.exports = {
    createPaymentUrl,
    getCodeIpnUrl,
};
