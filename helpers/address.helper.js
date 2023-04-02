import { contries } from '@/constants/contries.const';
export const getAddressDetail = (address) => {
    if (address) {
        address = address.split(' |');
        const contryCode = address[3];
        if (contryCode) {
            const contry = contries.find((contry) => contry.code === contryCode.trim());
            if (contry) {
                address[3] = ` ${contry.name}`;
            } else {
                address[3] = '';
            }
        }

        address = address.join(',');

        return address;
    } else {
        return '';
    }
};
