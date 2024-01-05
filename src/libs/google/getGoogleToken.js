import { nodeApi } from "@/axios/nodeApi";
import { Loading } from "notiflix";
const GOOGLE_ACCESS_TOKEN_ENDPOINT = "/google/auth/access_token";

export const getGoogleAccessToken = async (code) => {
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const res = await nodeApi.post(
            GOOGLE_ACCESS_TOKEN_ENDPOINT,
            { code }
        );
        console.log(res)
        return res.data
    } catch (error) {
        console.error(error.messsage)
    } finally {
        Loading.remove()
    }

}