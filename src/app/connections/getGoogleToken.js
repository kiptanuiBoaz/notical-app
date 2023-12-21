import { nodeApi } from "@/axios/nodeApi";


export const getGoogleAccessToken = async (code) => {
    const GOOGLE_ACCESS_TOKEN_ENDPOINT = "/google/auth/access_token";
    try {
        const res = await nodeApi.post(
            GOOGLE_ACCESS_TOKEN_ENDPOINT,
            { code }
        );
        console.log(res)
        return res.data
    } catch (error) {
        console.error(error.messsage)
    }

}