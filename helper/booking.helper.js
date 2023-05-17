export function translateBookingStatus(status = '') {
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
}

export function checkEnableEdit(status) {
    if (status === 'check_out' || status === 'rejected') {
        return false;
    }
    return true;
}

export function checkPayment(status) {
    if (status === '1') {
        return true;
    } else if (status === '0') {
        return false;
    }
}
