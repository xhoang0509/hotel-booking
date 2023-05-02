import axiosClient from '../axiosClient';

const bookingApi = {
    getAll(token) {
        return axiosClient.get('/booking', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getOne(id, token) {
        return axiosClient.get(`/booking/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    checkInOut(id, data, token) {
        return axiosClient.post(`/booking/${id}/checkinout`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default bookingApi;
