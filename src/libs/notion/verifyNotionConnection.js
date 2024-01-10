import { nodeApi } from "@/axios/nodeApi";
import { Loading } from "notiflix";
const VERIFY_NOTION_ACCESS_TOKEN_ENDPOINT = "/notion/auth/verify_access_token";

export const verifyNotionConnection = async (access_token) => {
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const res = await nodeApi.post(
            VERIFY_NOTION_ACCESS_TOKEN_ENDPOINT,
            { access_token }
        );

        return res.data
    } catch (error) {
        console.error(error.messsage)
    } finally {
        Loading.remove()
    }

}