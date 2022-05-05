import environment from "../environment";
import api from './api'

const AdminService = {
    baseHref: 'administration/',
    userLocalStorageKey: 'admin-session-data',

    getAdminSessionData() {
        return JSON.parse(localStorage.getItem(this.userLocalStorageKey));
    },

    async signIn(loginOrEmail, password) {
        const result = await api.post(
            this.baseHref + 'login',
            {loginOrEmail, password}
        );

        localStorage.setItem(this.userLocalStorageKey, JSON.stringify(result.data));

        return result.data;
    },

    logout() {
        localStorage.removeItem(this.userLocalStorageKey);
    },
};

export default AdminService;
