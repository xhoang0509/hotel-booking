import axiosClient from '../axiosClient';

const categoryApi = {
    getAll(token) {
        return axiosClient.get('/category', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getOne(id, token) {
        return axiosClient.get(`/category/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    create(data, token) {
        return axiosClient.post(`/category`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    update(data, id, token) {
        return axiosClient.put(`/category/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default categoryApi;
