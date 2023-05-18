const writeLog = require('../logger');

const rooms = require('../models').rooms;
const locations = require('../models').locations;

async function getOne(req, res) {
    try {
        const { id } = req.params;
        let room = await rooms.findOne({
            where: { id: id },
        });
        if (room) {
            res.status(200).json({
                status: true,
                room,
            });
        } else {
            res.status(200).json({
                status: false,
                message: 'room not found!',
            });
        }
    } catch (e) {
        writeLog(__filename, 'room.controller.getOne', e.message, 'FAILED');
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR' });
    }
}

async function getAll(req, res) {
    try {
        const roomDB = await rooms.findAll({
            include: [locations],
        });
        res.status(200).json({
            status: true,
            rooms: roomDB,
        });
    } catch (e) {
        writeLog(__filename, 'getAll', e.message, 'FAILED');
        res.status(500).json({ success: false, message: e.message });
    }
}

async function create(req, res) {
    try {
        const data = {
            name: req.body.name,
            bed: req.body.bed,
            bedDetail: req.body.bedDetail,
            description: req.body.description,
            oldPrice: req.body.oldPrice,
            newPrice: req.body.newPrice,
            images: req.body.images ? JSON.stringify(req.body.images) : '[]',
            options: req.body.options ? JSON.stringify([req.body.options]) : '[]',
            locationId: req.body.locationId,
            userBookings: '[]',
        };
        const room = await rooms.create(data);
        if (room) {
            res.status(200).json({
                status: true,
                message: 'OK',
            });
        } else {
            res.status(200).json({
                status: false,
                message: '',
            });
        }
    } catch (e) {
        writeLog(__filename, 'room.controller.create', e.message, 'FAILED');
        res.status(500).json({ status: false, message: 'INTERNAL_SERVER_ERROR ' + e.message });
    }
}

async function update(req, res) {
    try {
        const roomDB = await rooms.findAll({
            include: [locations],
        });
        res.status(200).json({
            status: true,
            rooms: roomDB,
        });
    } catch (e) {
        writeLog(__filename, 'getAll', e.message, 'FAILED');
        res.status(500).json({ success: false, message: e.message });
    }
}

module.exports = {
    getOne,
    getAll,
    create,
    update,
};
