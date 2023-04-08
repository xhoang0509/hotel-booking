const writeLog = require('../logger');

const cities = require('../models').cities;
const countries = require('../models').countries;

async function getAll(req, res) {
    try {
        let citiesData;
        let { categoryId } = req.query;
        if (categoryId) {
            citiesData = await cities.findAll({ where: { categoryId: categoryId } });
        } else {
            citiesData = await cities.findAll();
        }
        res.status(200).json({
            status: true,
            cities: citiesData,
        });
    } catch (e) {
        writeLog(__filename, 'city.controller.getAll', e.message, "FAILED");
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function getOne(req, res) {
    try {
        const { id } = req.params;
        const city = await cities.findOne({
            where: { id: id },
            include: countries,
        });
        res.status(200).json({
            status: true,
            city,
        });
    } catch (e) {
        writeLog(__filename, 'city.controller.getOne', e.message, "FAILED");
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function create(req, res) {
    try {
        const { name, image } = req.body;
        const city = await cities.create({ name, image });
        res.status(200).json({
            status: true,
            city,
        });
    } catch (e) {
        writeLog(__filename, 'city.controller.create', e.message, "FAILED");
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, image } = req.body;
        const city = await cities.findOne({
            where: { id: id },
        });
        if (city) {
            await cities.update({ name, image }, { where: { id: id } });
            res.status(200).json({
                status: true,
                message: 'Updated city!',
            });
        } else {
            res.status(401).json({
                status: false,
                message: 'city not found!',
            });
        }
    } catch (e) {
        writeLog(__filename, 'city.controller.update', e.message, "FAILED");
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

module.exports = {
    getAll,
    getOne,
    update,
    create,
};
