import axiosClient from '../axiosClient';

const locationApi = {
    getAll() {
        return axiosClient.get('/location');
    },

    getOne(id) {
        return axiosClient.get(`/location/${id}`);
    },
};

export default locationApi;
