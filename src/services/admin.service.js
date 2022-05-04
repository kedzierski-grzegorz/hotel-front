import environment from "../environment";
import api from './api'

const AdminService = {
    baseHref: 'administration/',
    userLocalStorageKey: 'admin-session-data',

    getAdminSessionData() {
        return JSON.parse(localStorage.getItem(this.userLocalStorageKey));
    },

    async signIn(loginOrEmail, password) {
        try {
            const result = await api.post(
                this.baseHref + 'login',
                {loginOrEmail, password}
            );

            localStorage.setItem(this.userLocalStorageKey, JSON.stringify(result.data));

            return result.data;
        } catch (e) {
            console.error(e);
        }
    },

    async test() {
        try {
            const result = await api.get(this.baseHref + 'test');
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }
};

export default AdminService;
