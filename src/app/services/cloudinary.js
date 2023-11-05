import { axiosInstance } from "../config/fetchAxios";

export const UploadImage = async (data) => {
    const response = axiosInstance.post(`/v1_1/do3gqpixo/image/upload`, data);
    return response;
};