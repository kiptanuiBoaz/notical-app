const BASE_URL = "https://squid-app-o4fnk.ondigitalocean.app/api";
import axios from 'axios';

const axiosOptions = {
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        withCredentials: false,
    }
}

// normal axios request
export const nodeApi = axios.create(axiosOptions);

// attached to req and res interceptors
export const privateApi = axios.create(axiosOptions);