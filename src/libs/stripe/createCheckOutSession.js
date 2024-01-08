import { stripeApi } from "@/axios/stripeApi";
import { Loading, Notify } from "notiflix";
const CREATE_CHECKOUT_SESSION_ROUTE = "/checkout/sessions"

export const createCheckOutSession = async (customer_id, price) => {
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const response = await stripeApi.post(
            CREATE_CHECKOUT_SESSION_ROUTE,
            {
                success_url: "http://localhost:3000/subscription",
                "cancel_url": "http://localhost:3000/subscription",
                "line_items[0][price]": price,
                "line_items[0][quantity]": "1",
                "mode": "subscription",
                "customer": customer_id,
                "subscription_data[trial_period_days]": 5
            }

        )

        console.log(response)
        return response;
    } catch (error) {
        console.error(error.message)
        Loading.remove()
    } finally {
        Loading.remove()
    }
}
