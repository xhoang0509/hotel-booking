import axiosClient from '../axiosClient';

const bookingApi = {
    getAll(token) {
        return axiosClient.get('/booking', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default bookingApi;
