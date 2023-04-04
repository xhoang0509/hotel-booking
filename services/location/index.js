import axiosClient from '../axiosClient';

const locationApi = {
    getAll() {
        return axiosClient.get('/location');
    },
};

export default locationApi;
