import axiosClient from '../axiosClient';

const fileApi = {
    createBookingExcel(token) {
        return axiosClient.post(
            '/file/booking/excel',
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    },

    getBookingExcel(token) {
        return axiosClient.get(`/file/booking/excel`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default fileApi;
