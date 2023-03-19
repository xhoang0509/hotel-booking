import axiosClient from "../axiosClient";

const userApi = {
    register(data) {
        return axiosClient.post('/user/register', data);
    },


    login(data) {
        return axiosClient.post('/user/login', data);
    },

    update(data, id) {
        return axiosClient.put(`/user/update/${id}`, data);
    }
}

export default userApi;