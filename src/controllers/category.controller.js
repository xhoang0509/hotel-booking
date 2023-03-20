const writeLog = require('../logger');

const categories = require('../models').categories;
const countries = require('../models').countries;

async function getAll(req, res) {
    try {
        const categoriesData = await categories.findAll({include: countries});
        res.status(200).json(
            {
                status: true,
                categories: categoriesData
            }
        );
    } catch (e) {
        writeLog(__filename, 'category.controller.getAll', e.message);
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}


async function get(req, res) {
    try {
        const { id } = req.params;
        const category = await categories.findOne({
            where: { id: id },
            include: countries
        });
        res.status(200).json(
            {
                status: true,
                category,
            }
        );
    } catch (e) {
        writeLog(__filename, 'category.controller.getAll', e.message);
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

module.exports = {
    getAll,
    get
};
