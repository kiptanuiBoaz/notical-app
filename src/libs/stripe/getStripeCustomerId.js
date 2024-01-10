import { stripeApi } from "@/axios/stripeApi";
import { Loading } from "notiflix";

export const getStripeCustomerId = async (id) => {
    const GET_CUSTOMER_ROUTES = "/customers";

    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });

        return await stripeApi.get(`${GET_CUSTOMER_ROUTES}/${id}`);

    } catch (error) {
        console.error(error.message)
        Loading.remove()
    } finally {
        Loading.remove()
    }
}
