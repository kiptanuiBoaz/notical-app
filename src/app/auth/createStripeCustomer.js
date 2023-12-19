import { stripeApi } from "@/axios/stripeApi";

export const createStripeCustomer = async (email) => {
    const CREATE_CUSTOMER_ROUTES = "/customers";

    try {
        const response = await stripeApi.post(
            CREATE_CUSTOMER_ROUTES,
            { email }
        )
        console.log(response)
        return response;
    } catch (error) {
        console.error(error.message)
        return error.message;
    }
}
