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

    async getRoomById(roomId) {
        return (await api.get('rooms/' + roomId)).data?.rows[0] ?? null;
    },

    async addRoom(room) {
        return (await api.post('rooms/', {
            title: room.title,
            description: room.description,
            floor: room.floor,
            price: room.price,
            sleeps: room.sleeps,
            img_link: room.img_link
        })).data?.id ?? 0;
    },

    async updateRoom(room) {
        await api.put('rooms/' + room.room_id, {
            title: room.title,
            description: room.description,
            floor: room.floor,
            price: room.price,
            sleeps: room.sleeps,
            img_link: room.img_link
        });
    },

    async deleteRoom(roomId) {
        await api.delete('rooms/' + roomId);
    },

    async getRoomFacilities(roomId) {
        return (await api.get('features/' + roomId)).data?.rows[0] ?? {};
    },

    async setRoomFacility(roomId, type, status) {
        await api.patch('features/' + roomId, {
            type: type,
            status: status
        });
    }
};

export default AdminService;
