import { nodeApi } from "@/axios/nodeApi";
import { Loading } from "notiflix"

const GET_GOOGLE_CALENDAR_IDS_ENDPOINT = "/google/get_calendar_ids"

export const getGoogleCalendarIds = async (refresh_token) => {
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const res = await nodeApi.post(
            GET_GOOGLE_CALENDAR_IDS_ENDPOINT,
            { refresh_token }
        )

        return res.data.ids;
    } catch (error) {
        console.error(error);
    } finally {
        Loading.remove();
    }

}