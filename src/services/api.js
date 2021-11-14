import axios from "axios";

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
    async (error) => {
        // let aux = !!error?.response?.data?.dt1;
        // const status = error.response ? error.response.status : null;
        // const isLogin = store.getState().auth.login;
        //
        // if (status === 401 && isLogin) {
        //     await store.dispatch(await RamActions.refreshToken());
        //     const original = error.config;
        //     const dto = store.getState().auth.dto;
        //     original._retry = true;
        //     original.anterior = original.headers.Authorization;
        //     original.headers.Authorization = `${dto.dt99} ${dto.dt100}`;
        //     return api.request(original);
        // }
        //
        // if (aux) {
        //     console.warn(JSON.stringify(error.response, null, 4));
        // } else {
        //     if (error?.response?.data?.Message) {
        //         console.error(error, JSON.stringify(error.response, null, 4));
        //         error.response.data.dt1 = error.response.data.Message;
        //     } else {
        //         console.error(error, JSON.stringify(error, null, 4));
        //         error.response = {data: {dt1: error.message}};
        //     }
        // }
        // if (!error.response?.config?.params?.na) {
        //     showDangerMsg(error.response.data.dt1, 'Error');
        // }
        // return Promise.reject(error?.response?.data ? error.response?.data : error)
        return Promise.reject(error?.response?.data ? error.response?.data : error)
    }
)

export default api
