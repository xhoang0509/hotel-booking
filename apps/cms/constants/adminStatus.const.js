export function getStatusLabel(status) {
    if (status === 'active') {
        return 'Hoạt động';
    } else if (status === 'inactive') {
        return 'Vô hiệu hóa';
    }
}
