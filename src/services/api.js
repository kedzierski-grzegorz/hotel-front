import axios from "axios";
import environment from "../environment";

const instance = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
