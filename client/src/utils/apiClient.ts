import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "/api/",
});

apiClient.interceptors.request.use(
    (config: any): any => {
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError): Promise<AxiosError> => {
        console.error(error.message);
        return Promise.reject(error);
    }
)

export default apiClient;