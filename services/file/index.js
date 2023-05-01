import axiosClient from '../axiosClient';

const fileApi = {
    createPdf(id, token) {
        return axiosClient.post(
            `/file/${id}/pdf`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    },
    sendPdf(id, token) {
        return axiosClient.get(`/file/${id}/pdf`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default fileApi;
