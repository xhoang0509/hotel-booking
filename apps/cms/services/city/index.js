import axiosClient from '../axiosClient';

const cityApi = {
    getAll(token) {
        return axiosClient.get('/city', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getOne(id, token) {
        return axiosClient.get(`/city/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    create(data, token) {
        return axiosClient.post(`/city`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    update(data, id, token) {
        return axiosClient.put(`/city/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default cityApi;
