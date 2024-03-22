import axios from 'axios'

import { BASE_URL, TOKEN } from '../constants';

const reqConfig = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
    },
};

const axiosReq = axios.create(reqConfig);

export default axiosReq