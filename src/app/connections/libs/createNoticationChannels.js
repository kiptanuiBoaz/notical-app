import { stripeApi } from "@/axios/stripeApi";
import { Loading, Notify } from "notiflix";
const CREATE_COMMS_CHANNEL_ENDPOINT = "/google/notifications/create_channel";

export const createNoticationChannels = async (access_token, webhook_url) => {

    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const res = await stripeApi.post(
            CREATE_COMMS_CHANNEL_ENDPOINT,
            { access_token, webhook_url }
        )
        console.log(res)
        Notify.success("Successfully created notification channels")
        return res;
    } catch (error) {
        console.error(error.message)
        return error.message;
    }
}
