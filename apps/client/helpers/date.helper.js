const moment = require('moment');
require('moment/locale/vi');

export function getDateDetail(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
}

export function formatDateVN(dateInput) {
    const date = moment(dateInput);
    const formattedDate = `${date.format('DD [tháng] M YYYY')}`;
    return formattedDate;
}

export function diffDay(dateI1, dateI2) {
    const date1 = new Date(dateI1);
    const date2 = new Date(dateI2);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export function getDayMonthYear(dateInput) {
    const date = new Date(dateInput);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function getYear(dataInput) {
    const date = new Date(dataInput);
    return date.getFullYear();
}

export function caculateDay(date_1, date_2) {
    const date1 = new Date(date_1);
    const date2 = new Date(date_2);

    const diffInMilliseconds = Math.abs(date2 - date1); // Calculate difference in milliseconds
    const diffInDays = Math.ceil(diffInMilliseconds / (24 * 60 * 60 * 1000)); // Convert difference to days
    return diffInDays;
}
