const writeLog = require('../logger');

const rooms = require('../models').rooms;

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
        const roomDB = await rooms.findAll();
    } catch (e) {
        writeLog(__filename, 'getAll', e.message, 'FAILED');
        res.status(500).json({ success: false, message, e });
    }
}

module.exports = {
    getOne,
    getAll,
};
