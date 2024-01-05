import { nodeApi } from "@/axios/nodeApi";
import { Loading, Notify } from "notiflix";
const CREATE_COMMS_CHANNEL_ENDPOINT = "/google/notifications/create_channel";

export const createNoticationChannels = async (access_token) => {

    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const res = await nodeApi.post(
            CREATE_COMMS_CHANNEL_ENDPOINT,
            { access_token }
        )
        console.log(res)
        Notify.success("Successfully created notification channels")
        return res;
    } catch (error) {
        console.error(error.message)
        return error.message;
    } finally {
        Loading.remove()
    }
}
