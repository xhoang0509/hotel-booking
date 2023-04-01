export const genders = [
    {
        value: 0,
        label: 'Nam',
    },
    {
        value: 1,
        label: 'Nữ',
    },
];

export const getGender = (value) => {
    if (value === '0' || value === 0) {
        return 'Nam';
    } else if (value === '1' || value === 1) {
        return 'Nữ';
    }
};
