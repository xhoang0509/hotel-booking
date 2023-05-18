import axiosClient from '../axiosClient';

const roomApi = {
    getAll(token) {
        return axiosClient.get('/room', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getOne(id, token) {
        return axiosClient.get(`/room/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    create(data, token) {
        return axiosClient.post(`/room`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    update(data, id, token) {
        return axiosClient.put(`/room/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default roomApi;
