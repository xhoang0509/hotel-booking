require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { welcomeCustomer } = require('../constant/email.const');
const { validateAdminRegister, validateAdminLogin } = require('../helper/ValidateAdmin');

const users = require('../models').users;
const admins = require('../models').admins;
const rules = require('../models').rules;
const writeLog = require('../logger');
const { getDateDetail } = require('../constant/date.const');

const { JWT_SECRET_KEY } = process.env;

async function register(req, res) {
    let result = {
        code: 500,
        data: {
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        },
    };
    let admin = {};
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            phone,
            birthday,
            gender,
            address,
            image,
            ruleId,
        } = req.body;

        // veryfiy field
        const [status, resultVal] = validateAdminRegister(
            email,
            password,
            firstName,
            lastName,
            ruleId
        );
        if (!status) {
            result = resultVal;
            return;
        }

        let adminExit = await admins.findOne({ where: { email: email } });
        if (adminExit && adminExit.id) {
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
        admin = await admins.create({
            email,
            password: passwordHash,
            firstName,
            lastName,
            phone,
            birthday,
            gender,
            address,
            image,
            ruleId,
        });
        delete admin.password;
        result = {
            code: 200,
            data: {
                status: true,
                message: 'Admin create successfully!',
                admin: admin,
            },
        };
    } catch (e) {
        writeLog(__filename, 'admin.controller.login', e.message);
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
    let admin = {};
    try {
        const { email, password } = req.body;

        // veryfiy field
        const [status, resultVal] = validateAdminLogin(email, password);
        if (!status) {
            result = resultVal;
            return;
        }

        admin = await admins.findOne({
            where: { email, email },
            include: {
                model: rules,
                attributes: ['id', 'name', 'description'],
            },
        });

        if (!admin) {
            result = {
                code: 404,
                data: {
                    status: false,
                    message: 'Admin not found!',
                },
            };
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);

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
        writeLog(__filename, 'admin.controller.login', `Admin: ${admin.email} login successfully`);
        const token = jwt.sign(
            { email: admin.email, id: admin.id, type: 'admin' },
            JWT_SECRET_KEY,
            {
                expiresIn: '1d',
            }
        );

        const { password: newPassword, ...adminData } = admin.toJSON();
        result = {
            code: 200,
            data: {
                status: true,
                message: 'Login successful!',
                admin: adminData,
                token,
            },
        };
    } catch (e) {
        writeLog(__filename, 'admin.controller.login', e.message);
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
            const admin = await admins.findOne({ where: { id: id } });
            if (admin && admin.id) {
                const admin = await admins.update(
                    { firstName, lastName, phone, birthday, nationality, gender, address, images },
                    { where: { id: id } }
                );
                res.status(200).json({
                    status: true,
                    message: 'Updated admin',
                    admin: admin,
                });
            } else {
                res.status(400).json({
                    status: false,
                    message: 'Admin not found!',
                });
            }
        }
    } catch (e) {
        writeLog(__filename, 'admin.controller.update', e.message);
        res.status(500).json({ status: false, nessage: e.message });
    }
}

async function getOne(req, res) {
    try {
        const { id } = req.params;
        let admin = await admins.findOne({ where: { id: id } });
        admin = admin.toJSON();
        let { password, ...newAdmin } = admin;
        if (admin) {
            res.status(200).json({
                status: true,
                admin: newAdmin,
            });
        }
    } catch (e) {
        writeLog(__filename, 'admin.controller.getOne', e.message);
        res.status(500).json({
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        });
    }
}

async function getAll(req, res) {
    try {
        let allAdmin = await admins.findAll({
            include: {
                model: rules,
                attributes: ['id', 'name', 'description'],
            },
        });
        res.status(200).json({
            status: true,
            admins: allAdmin,
        });
    } catch (error) {
        writeLog(__filename, 'admin.controller.getAll', e.message);
        res.status(500).json({
            status: false,
            message: 'INTERNAL_SERVER_ERROR',
        });
    }
}

async function changeStatus(req, res) {
    try {
        let { id, status } = req.params;
        let admin = await admins.findOne({ where: { id: id } });
        if (admin) {
            const admin = await admins.update({ status });
            res.status(200).json({
                status: true,
                message: 'Updated admin',
                admin: admin,
            });
        } else {
            res.status(200).json({
                status: false,
                message: 'Admin not found!',
            });
        }
    } catch (error) {
        writeLog(__filename, 'admin.controller.getAll', e.message);
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
    getAll,
    changeStatus,
};
