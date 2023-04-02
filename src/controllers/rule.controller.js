require('dotenv').config();
const writeLog = require('../logger');

const rules = require('../models').rules;

async function getAll(req, res) {
    try {
        const rulesData = await rules.findAll();
        res.status(200).json({
            status: true,
            data: {
                rules: rulesData,
            },
        });
    } catch (e) {
        writeLog(__filename, 'rule.controller.getAll', e.message);
        res.status(200).json({
            status: false,
            message: 'INTERNAL_SERVER_ERROR ' + e.message,
        });
    }
}

module.exports = {
    getAll,
};
