import { Loading } from 'notiflix';
import stripe from 'stripe';

const stripeClient = new stripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

export const createCheckOutSession = async (customer_id, price, trial) => {

    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });

        const session = await stripeClient.checkout.sessions.create({
            success_url: "http://localhost:3000?redirectedFrom=stripe",
            cancel_url: "http://localhost:3000/subscriptions",
            line_items: [
                {
                    price: price,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            customer: customer_id,
            subscription_data: {
                trial_period_days: trial,
            },
        });


        return window.location.href = session.url;
    } catch (error) {
        console.error(error.message);
        Loading.remove();
    } finally {
        Loading.remove();
    }
};


