import stripe from 'stripe';
const stripeClient = new stripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);


export const createStripeCustomer = async (email) => {
    try {
        return await stripeClient.customers.create({ email });
    } catch (error) {
        console.error(error.message)
    }
}