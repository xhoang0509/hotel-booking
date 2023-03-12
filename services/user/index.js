import axiosClient from "../axiosClient";

const userApi = {
    register(data) {
        return axiosClient.post('/user/register', data);
    },


    login(data) {
        return axiosClient.post('/user/login', data);
    }
}

export default userApi;