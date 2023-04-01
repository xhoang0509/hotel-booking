import axiosClient from '../axiosClient';

const userApi = {
    getAll(token) {
        return axiosClient.get('/user', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getOne(id, token) {
        return axiosClient.get(`/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    update(data, id, token) {
        return axiosClient.put(`/user/update/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default userApi;
