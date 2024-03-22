import axios from 'axios'

import { BASE_URL, TOKEN } from '../constants';

const reqConfig = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

const axiosReq = axios.create(reqConfig);

axiosReq.interceptors.request.use((config) => {
    let myConfig = config;
      myConfig.headers.Authorization = `Bearer ${TOKEN}`
    return myConfig;
});

export default axiosReq