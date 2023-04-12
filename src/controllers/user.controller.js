require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { welcomeCustomer, otpCustomer } = require('../constant/email.const');
const { validateUserRegister, validateUserLogin } = require('../helper/ValidateUser');

const users = require('../models').users;
const favorites = require('../models').favorites;
const locations = require('../models').locations;

const writeLog = require('../logger');
const { sendEmail } = require('../services/email.service');
const UserService = require('../services/user.service');
const { USER_STATUS } = require('../constant/user.const');

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
                    message: 'Email đã tồn tại!',
                },
            };
            return;
        }
        let passwordHash = await bcrypt.hash(password, 10);
        const userOTP = UserService.generateOTP();
        user = await users.create({
            email,
            password: passwordHash,
            firstName,
            lastName,
            status: USER_STATUS.DRAFT,
            otp: userOTP,
            otp_timestamp: Date.now()
        });
        const newUser = user.toJSON();
        delete newUser.password;

        let bodyEmail = otpCustomer
            .split('{{customer_name}}')
            .join(`${firstName} ${lastName}`)
            .split('{{customer_otp}}')
            .join(userOTP)
            .split("{{your_name}}")
            .join("Xuan Hoang")
            .split("{{company_name}}")
            .join("Datphong.com")
        await sendEmail(email, 'Xác thực đăng ký', bodyEmail);

        // let bodyEmail = welcomeCustomer
        //     .split('{{customer_name}}')
        //     .join(`${firstName} ${lastName}`)
        //     .split('{{company_name}}')
        //     .join('Booking.com')
        //     .split('{{your_name}}')
        //     .join('Xuan Hoang');
        // sendEmail(email, 'Welcome to Datphong.com', bodyEmail);
        result = {
            code: 200,
            data: {
                status: true,
                message: 'User create successfully!',
                user: newUser,
            },
        };
        writeLog(__filename, 'user.controller.login', 'Send email welcome to: ' + email, "OK");
    } catch (e) {
        writeLog(__filename, 'user.controller.login', e.message, 'FAILED');
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

        user = await users.findOne({ where: { email: email } });

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

        if (user.status !== USER_STATUS.ACTIVE) {
            result = {
                code: 404,
                data: {
                    status: false,
                    message: 'User not active!',
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

        const userData = user.toJSON();
        userData.token = token;
        delete userData.password;
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
        writeLog(__filename, 'user.controller.login', e.message, 'FAILED');
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
        writeLog(__filename, 'user.controller.update', e.message, 'FAILED');
        res.status(500).json({ status: false, message: e.message });
    }
}

async function getOne(req, res) {
    try {
        const { id } = req.params;
        let user = await users.findOne({ where: { id: id } });
        if (user) {
            let newUser = user.toJSON();
            delete newUser.password;
            res.status(200).json({
                status: true,
                user: newUser,
            });
        } else {
            res.status(200).json({
                status: false,
                message: 'Không tìm thấy người dùng',
            });
        }
        writeLog(__filename, 'user.controller.getOne', '', 'SUCCESS');
    } catch (e) {
        writeLog(__filename, 'user.controller.getOne', e.message, 'FAILED');
        res.status(500).json({
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        });
    }
}

async function getAll(req, res) {
    try {
        let usersData = await users.findAll();
        res.status(200).json({
            status: true,
            users: usersData,
        });
    } catch (e) {
        writeLog(__filename, 'user.controller.getAll', e.message, 'FAILED');
        res.status(500).json({
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        });
    }
}

async function booking(req, res) {
    res.status(200).json({
        status: true,
        message: 'OK',
    });
}

async function postFavorite(req, res) {
    try {
        const { userId, locationId } = req.body;
        if (!userId || !locationId) {
            res.status(200).json({
                status: false,
                message: 'Missing userId or locationId',
            });
            return;
        }
        const favorite = await favorites.findOne({ where: { userId, locationId } });
        if (favorite) {
            res.status(200).json({
                status: false,
                message: 'User favorited it!',
            });
            return;
        }
        await favorites.create({ userId, locationId });
        res.status(200).json({
            status: true,
            message: 'OK',
        });
    } catch (e) {
        writeLog(__filename, 'user.controller.postFavorite', e.message, 'FAILED');
        res.status(500).json({
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        });
    }
}

async function getFavorite(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(200).json({
                status: false,
                message: 'Missing id',
            });
            return;
        }
        let favoritesData = await favorites.findAll({ where: { userId: id } });
        if (favoritesData.length > 0) {
            const promise = favoritesData.map(async (favorite) => {
                const location = await locations.findOne({ where: { id: favorite.locationId } });
                return { ...favorite.toJSON(), location: location.toJSON() };
            });

            favoritesData = await Promise.all(promise);
        }
        res.status(200).json({
            status: true,
            favorites: favoritesData,
        });
    } catch (e) {
        writeLog(__filename, 'user.controller.getFavorite', e.message, 'FAILED');
        res.status(500).json({
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        });
    }
}

async function verify(req, res) {
    try {
        const { email, otp } = req.body;
        const user = await users.findOne({ where: { email: email } });
        if (user) {
            const currentTime = Date.now();
            if ((currentTime - user.otp_timestamp) / 10000 > 1000 * 60 * 10) {
                res.status(200).json({
                    status: false,
                    message: 'Otp đã hết hạn',
                });
                return;
            }

            if (user.otp === parseInt(otp)) {
                await users.update({ status: USER_STATUS.ACTIVE }, { where: { email: email } });
                res.status(200).json({
                    status: true,
                    message: 'OK',
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: 'Otp không hợp lệ',
                });
            }
        } else {
            res.status(400).json({
                status: false,
                message: 'Không tìm thấy người dùng'
            })
        }
    } catch (e) {
        writeLog(__filename, 'user.controller.verify', e.message, 'FAILED');
        res.status(400).json({
            status: false,
            message: e.message,
        });
    }
}

async function requestOtp(req, res) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('ip :', JSON.stringify(ip));
        const { email } = req.body;
        const user = await users.findOne({ where: { email: email } });
        if (user) {
            const userOTP = UserService.generateOTP();
            await users.update({
                otp: userOTP,
                otp_timestamp: Date.now()
            }, { where: { email: email } });
            let bodyEmail = otpCustomer
                .split('{{customer_name}}')
                .join(`${user.firstName} ${user.lastName}`)
                .split('{{customer_otp}}')
                .join(userOTP)
                .split("{{your_name}}")
                .join("Xuan Hoang")
                .split("{{company_name}}")
                .join("Datphong.com")
            await sendEmail(email, 'Xác thực đăng ký', bodyEmail);
            writeLog(__filename, 'user.controller.requestOtp', "", 'OK');
            res.status(200).json({
                status: true,
                message: "Request OTP OK",
            });
        } else {
            res.status(400).json({
                status: false,
                message: "User not found!",
            });
        }
    } catch (e) {
        writeLog(__filename, 'user.controller.requestOtp', e.message, 'FAILED');
        res.status(400).json({
            status: false,
            message: e.message,
        });
    }
}

module.exports = {
    register,
    login,
    update,
    getOne,
    getAll,
    booking,
    getFavorite,
    postFavorite,
    verify,
    requestOtp
};
