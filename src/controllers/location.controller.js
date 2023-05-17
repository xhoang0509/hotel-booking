const writeLog = require('../logger');

const locations = require('../models').locations;
const cities = require('../models').cities;
const rooms = require('../models').rooms;

const LOCATION_PER_PAGE = 5;
async function getAll(req, res) {
    try {
        const page = req.query.page || 1;
        let offset = 0;
        if (page) {
            offset = parseInt(page - 1) * LOCATION_PER_PAGE;
        }
        const count = await locations.count();
        const locationsData = await locations.findAll({
            include: cities,
            limit: LOCATION_PER_PAGE,
            offset,
        });
        const totalPage = Math.ceil(count / LOCATION_PER_PAGE);
        res.status(200).json({
            status: true,
            total: count,
            page: parseInt(page),
            totalPage,
            locations: locationsData,
        });
    } catch (e) {
        writeLog(__filename, 'location.controller.getAll', e.message, 'FAILED');
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function getFull(req, res) {
    try {
        const locationsData = await locations.findAll({
            include: cities,
        });
        res.status(200).json({
            status: true,
            locations: locationsData,
        });
    } catch (e) {
        writeLog(__filename, 'location.controller.getAll', e.message, 'FAILED');
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
                message: 'Location not found!',
            });
        }
    } catch (e) {
        writeLog(__filename, 'location.controller.getOne', e.message, 'FAILED');
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function create(req, res) {
    try {
        const {
            name,
            address,
            images,
            thumbnail,
            description,
            phone,
            oldPrice,
            newPrice,
            convenients,
            notes,
            cityId,
            qr_banking,
        } = req.body;
        const location = await locations.create({
            name,
            address,
            images,
            thumbnail,
            description,
            phone,
            oldPrice,
            newPrice,
            convenients,
            notes,
            cityId,
            qr_banking,
        });
        res.status(200).json({
            status: true,
            location,
        });
    } catch (e) {
        writeLog(__filename, 'location.controller.create', e.message, 'FAILED');
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
        writeLog(__filename, 'location.controller.update', e.message, 'FAILED');
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

module.exports = {
    getAll,
    getFull,
    getOne,
    update,
    create,
};
