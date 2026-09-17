import axiosClient from '../axiosClient';

const locationApi = {
    getAll(page) {
        return axiosClient.get(`/location?page=${page}`);
    },

    getOne(id) {
        return axiosClient.get(`/location/${id}`);
    },
};

export default locationApi;
