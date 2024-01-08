import { stripeApi } from "@/axios/stripeApi";
import { Loading } from "notiflix";
const CREATE_CUSTOMER_PORTAL_ROUTE = "/billing_portal/sessions"

export const createCustomerPortal = async (customer) => {
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const response = await stripeApi.post(
            CREATE_CUSTOMER_PORTAL_ROUTE,
            { customer, return_url: "http://localhost:3000/subscription" }
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
