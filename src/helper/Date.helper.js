const moment = require('moment');

function getAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const now = new Date();

    let age = now.getUTCFullYear() - birthDate.getUTCFullYear();
    const monthDiff = now.getUTCMonth() - birthDate.getUTCMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getUTCDate() < birthDate.getUTCDate())) {
        age--;
    }

    return age;
}

function checkExistRoom(checkIn, checkOut, bookings = []) {
    if (bookings && bookings.length) {
        const checkInDate = new Date(checkIn).getTime();
        const checkOutDate = new Date(checkOut).getTime();

        for (let i = 0; i < bookings.length; i++) {
            let booking = bookings[i];
            let existingCheckIn = new Date(booking.checkInDate).getTime();
            let existingCheckOut = new Date(booking.checkOutDate).getTime();
            let now = Date.now();

            if (checkInDate < now || checkOut < now) {
                return false;
            }

            if (
                (checkInDate >= existingCheckIn && checkInDate < existingCheckOut) ||
                (checkOutDate > existingCheckIn && checkOutDate <= existingCheckOut) ||
                (checkInDate <= existingCheckIn && checkOutDate >= existingCheckOut)
            ) {
                return false;
            }
        }
        return true;
    } else {
        return true;
    }
}

function formatDateVN(dateInput) {
    const date = moment(dateInput);
    const formattedDate = `${date.format('DD [tháng] M YYYY')}`;
    return formattedDate;
}

module.exports = {
    getAge,
    checkExistRoom,
    formatDateVN,
};
