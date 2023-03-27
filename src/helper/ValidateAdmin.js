const { emailRegex } = require('../constant/regex.const');

function validateAdminRegister(email, password, firstName, lastName, ruleId) {
    let result;
    let status = true;
    if (!email || !password || !firstName || !lastName || !ruleId) {
        result = {
            code: 400,
            data: {
                status: false,
                message: 'Missing email or password or first name, last name or ruleId',
            },
        };
        status = false;
    }

    if (password.length < 6) {
        result = {
            code: 400,
            data: {
                status: false,
                message: 'Password must be more than 6 characters',
            },
        };
        status = false;
    }

    if (!emailRegex.test(email)) {
        result = {
            code: 400,
            data: {
                status: false,
                message: 'Invalid email',
            },
        };
        status = false;
    }
    return [status, result];
}

function validateAdminLogin(email, password) {
    let result;
    let status = true;
    if (!email || !password) {
        result = {
            code: 400,
            data: {
                status: false,
                message: 'Missing email or password',
            },
        };
        status = false;
    }

    if (password.length < 6) {
        result = {
            code: 400,
            data: {
                status: false,
                message: 'Password must be more than 6 characters',
            },
        };
        status = false;
    }

    if (!emailRegex.test(email)) {
        result = {
            code: 400,
            data: {
                status: false,
                message: 'Invalid email',
            },
        };
        status = false;
    }
    return [status, result];
}

module.exports = {
    validateAdminRegister,
    validateAdminLogin,
};
