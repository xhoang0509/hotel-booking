import axiosClient from '../axiosClient';

const paymentApi = {
    create(data, token) {
        return axiosClient.post('/payment', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    checkStatus(id) {
        return axiosClient.get(`/payment/${id}`);
    },
};

export default paymentApi;
