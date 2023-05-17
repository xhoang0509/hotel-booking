import axiosClient from '../axiosClient';

const userApi = {
    register(data) {
        return axiosClient.post('/user/register', data);
    },

    login(data) {
        return axiosClient.post('/user/login', data);
    },

    update(data, id, token) {
        return axiosClient.put(`/user/update/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getOne(id, token) {
        return axiosClient.get(`/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getFavorite(id, token) {
        return axiosClient.get(`/user/favorite/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    addFavorite(data, token) {
        return axiosClient.post(`/user/favorite`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    deleteFavorite(id, data, token) {
        return axiosClient.post(`/user/favorite/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    verify(data) {
        return axiosClient.post('/user/verify', data);
    },

    requestOTP(data) {
        return axiosClient.post('/user/request-otp', data);
    },

    forgotPassword(data) {
        return axiosClient.post('/user/forgot-password', data);
    },

    resetPassword(data) {
        return axiosClient.post('/user/reset-password', data);
    },
};

export default userApi;
