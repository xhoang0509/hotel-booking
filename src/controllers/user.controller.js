require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { welcomeCustomer } = require('../constant/email.const');
const { validateUserRegister, validateUserLogin } = require('../helper/ValidateUser');

const users = require('../models').users;
const writeLog = require('../logger');
const { sendEmail } = require('../services/email.service');

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
        delete user.password;

        let bodyEmail = welcomeCustomer
            .split('{{customer_name}}')
            .join(`${firstName} ${lastName}`)
            .split('{{company_name}}')
            .join('Booking.com')
            .split('{{your_name}}')
            .join('Xuan Hoang');
        sendEmail(email, 'Welcome to Boooking.com', bodyEmail);
        result = {
            code: 200,
            data: {
                status: true,
                message: 'User create successfully!',
                user: user,
            },
        };
        writeLog(__filename, 'user.controller.login', 'Send email welcome to: ' + email);
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

        const token = jwt.sign({ email: user.email, id: user.id, type: 'user' }, JWT_SECRET_KEY, {
            expiresIn: '1d',
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

async function update(req, res) {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, birthday, nationality, gender, address, images } =
            req.body;
        if (!id) {
            res.status(400).json({ status: false, message: 'Missing id' });
        } else {
            const user = await users.findOne({ where: { id: id } });
            if (user && user.id) {
                const user = await users.update(
                    { firstName, lastName, phone, birthday, nationality, gender, address, images },
                    { where: { id: id } }
                );
                res.status(200).json({
                    status: true,
                    message: 'Updated user',
                    user: user,
                });
            } else {
                res.status(400).json({
                    status: false,
                    message: 'User not found!',
                });
            }
        }
    } catch (e) {
        writeLog(__filename, 'user.controller.update', e.message);
        res.status(500).json({ status: false, nessage: e.message });
    }
}

async function getOne(req, res) {
    try {
        const { id } = req.params;
        let user = await users.findOne({ where: { id: id } });
        user = user.toJSON();
        let { password, ...newUser } = user;
        if (user) {
            res.status(200).json({
                status: true,
                user: newUser,
            });
        }
    } catch (e) {
        writeLog(__filename, 'user.controller.getOne', e.message);
        res.status(500).json({
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        });
    }
}

module.exports = {
    register,
    login,
    update,
    getOne,
};
