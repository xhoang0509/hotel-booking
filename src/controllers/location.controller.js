const writeLog = require('../logger');

const locations = require('../models').locations;
const countries = require('../models').countries;

async function getAll(req, res) {
    try {
        const locationsData = await locations.findAll();
        res.status(200).json({
            status: true,
            locations: locationsData,
        });
    } catch (e) {
        writeLog(__filename, 'category.controller.getAll', e.message);
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function getOne(req, res) {
    try {
        const { id } = req.params;
        const category = await locations.findOne({
            where: { id: id },
            include: countries,
        });
        res.status(200).json({
            status: true,
            category,
        });
    } catch (e) {
        writeLog(__filename, 'category.controller.getOne', e.message);
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function create(req, res) {
    try {
        const { name, image } = req.body;
        const category = await locations.create({ name, image });
        res.status(200).json({
            status: true,
            category,
        });
    } catch (e) {
        writeLog(__filename, 'category.controller.create', e.message);
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, image } = req.body;
        const category = await locations.findOne({
            where: { id: id },
        });
        if (category) {
            await locations.update({ name, image }, { where: { id: id } });
            res.status(200).json({
                status: true,
                message: 'Updated category!',
            });
        } else {
            res.status(401).json({
                status: false,
                message: 'Category not found!',
            });
        }
    } catch (e) {
        writeLog(__filename, 'category.controller.update', e.message);
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

module.exports = {
    getAll,
    getOne,
    update,
    create,
};
