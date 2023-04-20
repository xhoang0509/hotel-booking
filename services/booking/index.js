import axiosClient from '../axiosClient';

const bookingApi = {
    booking(data, token) {
        return axiosClient.post('/booking', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getAll() {
        return axiosClient.get('/booking');
    },
};

export default bookingApi;
