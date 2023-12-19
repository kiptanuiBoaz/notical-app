const BASE_URL = "https://squid-app-o4fnk.ondigitalocean.app/api";
import axios from 'axios';

// Check if window is defined (client-side)
const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

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