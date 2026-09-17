const randomstring = require('randomstring');

const UserService = {
    generateOTP: function generateOTP() {
        const otpLength = 6;
        const otp = randomstring.generate({
            length: otpLength,
            charset: 'numeric',
        });
        return otp;
    },
};

module.exports = UserService;
