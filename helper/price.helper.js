export const formattedPrice = function (price) {
    if (price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    } else {
        return '';
    }
};
