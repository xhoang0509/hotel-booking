'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserRoom = sequelize.define('user_room', {
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        room_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'rooms',
                key: 'id',
            },
        },
        pirce: DataTypes.INTEGER(11),
    });
    return UserRoom;
};
