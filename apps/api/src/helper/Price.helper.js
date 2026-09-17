const formattedPrice = function (price) {
    if (price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    } else {
        return '';
    }
};

const formattedPriceEN = function (price) {
    if (price) {
        return price.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            useGrouping: true,
        });
    } else {
        return '';
    }
};

module.exports = {
    formattedPrice,
    formattedPriceEN,
};
