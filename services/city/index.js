import axiosClient from '../axiosClient';

const cityApi = {
    getAll() {
        return axiosClient.get('/city');
    },
    search(cateogryId) {
        return axiosClient.get(`/city/?categoryId=${cateogryId}`);
    },
};

export default cityApi;
