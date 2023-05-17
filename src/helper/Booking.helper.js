module.exports = {
    translateBookingStatus: function (status = '') {
        if (status) {
            switch (status) {
                case 'not_check_in':
                    return 'Chưa nhận phòng';
                case 'check_in':
                    return 'Đã nhận phòng';
                case 'check_out':
                    return 'Đã trả phòng';
                case 'rejected':
                    return 'Hủy bỏ';
            }
        }

        return '';
    },

    translateBookingPayment: function (status) {
        if (status === '1') {
            return 'Đã thanh toán';
        } else if (status === '0') {
            return 'Chưa thanh toán';
        }
    },

    translatePaymentMethod: function (paymentMethod = '') {
        if (paymentMethod) {
            switch (paymentMethod) {
                case 'cash':
                    return 'Tiền mặt';
                case 'banking':
                    return 'Chuyển khoản';
                case 'vnpay':
                    return 'Ví VNPAY';
            }
        } else {
            return '';
        }
    },
};
