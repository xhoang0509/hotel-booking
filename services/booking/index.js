import axiosClient from '../axiosClient';

const bookingApi = {
    booking(data, token) {
        return axiosClient.post('/booking', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getOne(id, token) {
        return axiosClient.get(`/booking/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    update(id, data, token) {
        return axiosClient.put(`/booking/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getBookingsByUser(id, token) {
        return axiosClient.get(`/booking/${id}/user`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default bookingApi;
