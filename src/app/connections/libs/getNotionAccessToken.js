import { nodeApi } from "@/axios/nodeApi";

export const getNotionAccessToken = async (user_id, code) => {
    const NOTION_ACCESS_TOKEN_ENDPOINT = "/notion/auth/access_token";
    try {
        const res = await nodeApi.post(
            NOTION_ACCESS_TOKEN_ENDPOINT,
            { user_id, code }
        );
        console.log(res)
        return res.data.access_token;
    } catch (error) {
        console.error(error.messsage)
    }

}