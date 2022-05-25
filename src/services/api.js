import axios from "axios";
import environment from "../environment";
import AdminService from "./admin.service";

const instance = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    config => {
        const sessionData = localStorage.getItem(AdminService.userLocalStorageKey);
        if (sessionData) {
            const sessionObj = JSON.parse(sessionData);
            if (sessionObj && sessionObj.token) {
                config.headers['Authorization'] = 'Bearer ' + sessionObj.token;
            }
        }
        return config;
    }
);

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 403) {
            localStorage.removeItem(AdminService.userLocalStorageKey);
            window.location.href = '/admin/sign-in';
        }
        return Promise.reject(error);
    }
);

export default instance;
