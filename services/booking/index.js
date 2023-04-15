import axiosClient from '../axiosClient';

const bookingApi = {
    booking(data, token) {
        return axiosClient.post('/category', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getAll() {
        return axiosClient.get('/category');
    },
};

export default bookingApi;
