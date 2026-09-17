export function isAdmin(rule) {
    if (rule.name === 'Quản lý') {
        return true;
    } else {
        return false;
    }
}

export function isStaff(rule) {
    if (rule.name === 'Nhân viên') {
        return true;
    } else {
        return false;
    }
}
