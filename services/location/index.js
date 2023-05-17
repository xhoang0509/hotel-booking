import axiosClient from '../axiosClient';

const locationApi = {
    getAll(token) {
        return axiosClient.get('/location/all', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getOne(id, token) {
        return axiosClient.get(`/location/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    create(data, token) {
        return axiosClient.post(`/location`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    update(data, id, token) {
        return axiosClient.put(`/location/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default locationApi;
