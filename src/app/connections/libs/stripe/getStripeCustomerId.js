import { stripeApi } from "@/axios/stripeApi";

export const getStripeCustomerId = async (id) => {
    const GET_CUSTOMER_ROUTES = "/customers/";

    try {
        const response = await stripeApi.get(`${GET_CUSTOMER_ROUTES}${id}`)
        console.log(response)
        return response;
    } catch (error) {
        console.error(error.message)
        return error.message;
    }
}
