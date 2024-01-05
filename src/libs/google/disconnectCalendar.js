import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loading, Notify } from "notiflix";


export const disconnectCalendar = async (user_id, email) => {
    const supabase = createClientComponentClient();
    try {
        Loading.dots({ svgColor: '#0276AA', backgroundColor: 'rgba(0,0,0,0.4)', });
        const { error, data } = await supabase.from('users').upsert({
            user_id,
            email,
            google_access_token: null,
            google_refresh_token: null,
            active: false,
        });

        if (data) console.log(data)
        if (error) throw error
        Notify.success("Calendar Disconnected Successfully")

    } catch (error) {
        console.error(error.message)
    } finally {
        Loading.remove();
    }
}