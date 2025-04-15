import axios from "axios";

export const request = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    // withCredentials: true,
});

request.interceptors.request.use((config) => {
    config.headers.Authorization = `Barear ${
        JSON.parse(localStorage.getItem("auth") || "{}")?.state?.token
    }`;
    return config;
});
