import axios from "axios";
import environment from "../environment";

const AdminService = {
    baseHref: environment.apiUrl + 'administration/',
    userLocalStorageKey: 'admin-session-data',

    async signIn(loginOrEmail, password) {
        try {
            const result = await axios.post(
                this.baseHref + 'login',
                {loginOrEmail, password}
            );

            return result.data;
        } catch (e) {
            console.error(e);
        }
    }
};

export default AdminService;
