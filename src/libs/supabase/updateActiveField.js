import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loading } from "notiflix";

export const updateActiveField = async (user_id, email, active) => {
    const supabase = createClientComponentClient();
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const { error, data } = await supabase.from('users').upsert({
            user_id,
            email,
            active
        })

        if (error) throw error;
        if (data) return data;
        Loading.remove()
    } catch (error) {
        console.error(error.message)
    }

}
