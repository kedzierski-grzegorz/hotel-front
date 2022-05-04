import axiosInstance from "./api";
import AdminService from "./admin.service";

const setup = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            if (config.url.startsWith("administration/")) {
                const token = AdminService.getAdminSessionData().token;
                if (token) {
                    config.headers["Authorization"] = 'Bearer ' + token;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};
export default setup;
