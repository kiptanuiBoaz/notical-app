import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loading, Notify } from "notiflix";

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

export const updateTableWithGoogleTokens = async (google_access_token, google_refresh_token, email, user_id) => {
    const supabase = createClientComponentClient();
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const { error } = await supabase.from('users').upsert({
            user_id,
            google_access_token,
            google_refresh_token,
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

export const updateTableWithCalendarIds = async (calendar_ids, email, user_id) => {
    const supabase = createClientComponentClient();
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const { error } = await supabase.from('users').upsert({
            user_id,
            calendar_ids,
            email
        })
        if (error) throw error
        Notify.success("Google Calendar Ids Added Successfully")

    } catch (error) {
        console.error(error.message)
    } finally {
        Loading.remove();
    }

}

