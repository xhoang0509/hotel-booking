const writeLog = require('../logger');

const locations = require('../models').locations;
const cities = require('../models').cities;
const rooms = require('../models').rooms;

async function getAll(req, res) {
    try {
        const locationsData = await locations.findAll({
            include: cities
        });
        res.status(200).json({
            status: true,
            locations: locationsData,
        });
    } catch (e) {
        writeLog(__filename, 'location.controller.getAll', e.message, "FAILED");
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function getOne(req, res) {
    try {
        const { id } = req.params;
        let location = await locations.findOne({
            where: { id: id },
            include: cities,
        });
        if (location) {
            location = location.toJSON();
            const roomsData = await rooms.findAll({ where: { locationId: location.id } });
            location.rooms = roomsData;
            res.status(200).json({
                status: true,
                location,
            });
        } else {
            res.status(200).json({
                status: false,
                message: "Location not found!",
            });
        }
    } catch (e) {
        writeLog(__filename, 'location.controller.getOne', e.message, "FAILED");
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
        writeLog(__filename, 'location.controller.create', e.message, "FAILED");
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, image } = req.body;
        const location = await locations.findOne({
            where: { id: id },
        });
        if (location) {
            await locations.update({ name, image }, { where: { id: id } });
            res.status(200).json({
                status: true,
                message: 'Updated location!',
            });
        } else {
            res.status(401).json({
                status: false,
                message: 'Location not found!',
            });
        }
    } catch (e) {
        writeLog(__filename, 'location.controller.update', e.message, "FAILED");
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

module.exports = {
    getAll,
    getOne,
    update,
    create,
};
