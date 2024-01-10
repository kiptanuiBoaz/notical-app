import stripe from 'stripe';
import { Loading } from 'notiflix';

const stripeClient = stripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);


export const createCustomerPortal = async (customer) => {
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });

        const session = await stripeClient.billingPortal.sessions.create({
            customer,
            return_url: process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_RETURN_URL,
        });

        return window.location.href = session.url;
    } catch (error) {
        console.error(error.message);
        Loading.remove();
        throw error; // Rethrow the error to handle it further if needed
    } finally {
        Loading.remove();
    }
};
