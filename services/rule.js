import axiosClient from './axiosClient';

const ruleApi = {
    getAll(token) {
        return axiosClient.get(`/rule`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
};

export default ruleApi;