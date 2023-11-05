import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://api.cloudinary.com",
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});