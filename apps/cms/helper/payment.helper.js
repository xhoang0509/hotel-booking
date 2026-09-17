export function paymentMethod(paymentMethod = '') {
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
}
