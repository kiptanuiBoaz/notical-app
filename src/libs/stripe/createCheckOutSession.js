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
            { customer_id, price }
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
