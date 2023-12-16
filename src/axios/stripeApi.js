const BASE_URL = "https://api.stripe.com/v1";
import axios from 'axios';

// Check if window is defined (client-side)
const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

const axiosOptions = {
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json",
        withCredentials: false,
        "Authorization": `Bearer sk_test_51HIAUkIVOiWOJVaA59Cwxh8qpE1a1OqRU69ddyWvHrpRsUWxSyuwP1YdKTm3HO6HCTRJT8GE9sjXAUaVGQ96WNRk00SwxIlWCL`,
    }
}
console.log(process.env.STRIPE_AUTHORIZATION_TOKEN)
// normal axios request
export const stripeApi = axios.create(axiosOptions);

// attached to req and res interceptors
export const privateApi = axios.create(axiosOptions);