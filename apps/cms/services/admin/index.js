import axiosClient from '../axiosClient';

const adminApi = {
    getAll(token) {
        return axiosClient.get('/admin', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getOne(id, token) {
        return axiosClient.get(`/admin/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    register(data) {
        return axiosClient.post('/admin/register', data);
    },

    login(data) {
        return axiosClient.post('/admin/login', data);
    },

    update(data, id, token) {
        return axiosClient.put(`/admin/update/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default adminApi;
