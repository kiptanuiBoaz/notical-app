import { stripeApi } from "@/axios/stripeApi";

export const createStripeCustomer = async (full_name, email) => {
    const CREATE_CUSTOMER_ROUTES = "/customers";

    try {
        const response = await stripeApi.post(
            CREATE_CUSTOMER_ROUTES,
            { email, name: full_name }
        )
        // console.log(response)
        return response;
    } catch (error) {
        console.error(error.message)
        return error.message;
    }
}
