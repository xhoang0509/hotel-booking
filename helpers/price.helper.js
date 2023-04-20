export const formattedPrice = function (price) {
    if (price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    } else {
        return '';
    }
};

export const diffPrice = function (oldPrice, newPrice) {
    return oldPrice - newPrice;
}

export const savePercent = function (oldPrice, newPrice) {
    let percent = (oldPrice - newPrice) / oldPrice * 100;
    return Math.floor(percent);
}