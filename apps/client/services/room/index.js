import axiosClient from '../axiosClient';

const roomApi = {
    getAll() {
        return axiosClient.get('/room');
    },

    getOne(id) {
        return axiosClient.get(`/room/${id}`);
    },
};

export default roomApi;
