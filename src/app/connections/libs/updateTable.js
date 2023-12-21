import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loading, Notify } from "notiflix";

const VERIFY_TOKEN_ENDPOINT = "/notion/auth/verify_access_token"



export const verifyAccessToken = (notionAccessToken) => {
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const token_is_valid = nodeApi.post()
    } catch (error) {

    } finally {
        Loading.remove();
    }
}

export const updateUserTableWithAccessToken = async (user_id, notion_secret_key, email) => {
    const supabase = createClientComponentClient();
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const { error } = await supabase.from('users').upsert({
            user_id,
            notion_secret_key,
            email
        })
        if (error) throw error
        Notify.success("Notion Connected Successfully")

    } catch (error) {
        console.error(error.message)
    } finally {
        Loading.remove();
    }
}

export const updateTableWithGoogleTokens = async (acces_token, refresh_token, email, user_id) => {
    const supabase = createClientComponentClient();
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const { error } = await supabase.from('users').upsert({
            user_id,
            acces_token,
            refresh_token,
            email
        })
        if (error) throw error
        Notify.success("Google Calendar Connected Successfully")

    } catch (error) {
        console.error(error.message)
    } finally {
        Loading.remove();
    }

}

