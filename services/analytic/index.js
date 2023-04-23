import axiosClient from '../axiosClient';

const analyticApi = {
    getAll(token) {
        return axiosClient.get('/analytic', {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default analyticApi;
