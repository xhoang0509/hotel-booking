const moment = require('moment');
require('moment/locale/vi');

export function formatDateVN(dateInput) {
    const date = moment(dateInput);
    const formattedDate = `${date.format('DD [tháng] M YYYY')}`;
    return formattedDate;
}
