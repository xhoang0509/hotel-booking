import axiosClient from '../axiosClient';

const cityApi = {
    getAll() {
        return axiosClient.get('/city');
    },
};

export default cityApi;
