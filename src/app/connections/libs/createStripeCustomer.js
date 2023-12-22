import { stripeApi } from "@/axios/stripeApi";
import { Loading, Notify } from "notiflix";

export const createStripeCustomer = async (email) => {
    const CREATE_CUSTOMER_ROUTES = "/customers";

    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const response = await stripeApi.post(
            CREATE_CUSTOMER_ROUTES,
            { email }
        )
        Notify.success("Created added to stripe successfully")
        console.log(response)
        return response;
    } catch (error) {
        console.error(error.message)

    } finally {
        Loading.remove()
    }
}
