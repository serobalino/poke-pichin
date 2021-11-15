import axios from "axios";
import {notification} from "antd";

let headers = {
    'Content-Type': 'application/json',
};


const api = axios.create({
    baseURL: `https://pokemon-pichincha.herokuapp.com`
});

api.defaults.headers = headers;
api.interceptors.response.use(
    (response) => {
        return response.data;

    },
    (error) => {
        notification.error({
            message: "Error",
            description: error.message,
        });
        return Promise.reject(error?.response?.data ? error.response?.data : error)
    }
)

export default api
