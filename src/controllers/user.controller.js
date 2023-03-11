require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { validateUserRegister, validateUserLogin } = require('../helper/ValidateUser');

const users = require('../models').users;
const writeLog = require('../logger');

const { JWT_SECRET_KEY } = process.env;

async function register(req, res) {
    let result = {
        code: 500,
        data: {
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        },
    };
    let user = {};
    try {
        const { email, password, firstName, lastName } = req.body;

        // veryfiy field
        const [status, resultVal] = validateUserRegister(email, password, firstName, lastName);
        if (!status) {
            result = resultVal;
            return;
        }

        let userExit = await users.findOne({ where: { email: email } });
        if (userExit && userExit.id) {
            result = {
                code: 400,
                data: {
                    status: false,
                    message: 'Email already exists!',
                },
            };
            return;
        }
        let passwordHash = await bcrypt.hash(password, 10);
        user = await users.create({ email, password: passwordHash, firstName, lastName });
        const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY);
        delete user.password;
        result = {
            code: 200,
            data: {
                status: true,
                message: 'User create successfully!',
                user: user,
                token,
            },
        };
    } catch (e) {
        writeLog(__filename, 'user.controller.login', e.message);
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

async function login(req, res) {
    let result = {
        code: 500,
        data: {
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        },
    };
    let user = {};
    try {
        const { email, password } = req.body;

        // veryfiy field
        const [status, resultVal] = validateUserLogin(email, password);
        if (!status) {
            result = resultVal;
            return;
        }

        user = await users.findOne({ where: { email, email } });

        if (!user) {
            result = {
                code: 404,
                data: {
                    status: false,
                    message: 'User not found!',
                },
            };
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            result = {
                code: 401,
                data: {
                    status: false,
                    message: 'Invalid password!',
                },
            };
            return;
        }

        const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET_KEY, {
            expiresIn: '7d',
        });
        const { password: newPassword, ...userData } = user.toJSON();
        result = {
            code: 200,
            data: {
                status: true,
                message: 'Login successful!',
                user: userData,
                token,
            },
        };
    } catch (e) {
        writeLog(__filename, 'user.controller.register', e.message);
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
    register,
    login,
};
