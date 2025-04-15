import axios from "axios";

export const request = axios.create({
    baseURL: import.meta.env.BASE_URL,
    // withCredentials: true,
});

request.interceptors.request.use((config) => {
    config.headers.Authorization = `Barear ${
        JSON.parse(localStorage.getItem("auth") || "{}")?.state?.token
    }`;
    return config;
});
