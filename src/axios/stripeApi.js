const BASE_URL = "https://api.stripe.com/v1";
import axios from 'axios';


const axiosOptions = {
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        withCredentials: false,
        "Authorization": process.env.NEXT_PUBLIC_STRIPE_API_KEY,
    }
}

// normal axios request
export const stripeApi = axios.create(axiosOptions);

// attached to req and res interceptors
export const privateApi = axios.create(axiosOptions);