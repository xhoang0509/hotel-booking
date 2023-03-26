import axiosClient from '../axiosClient';

const adminApi = {
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
