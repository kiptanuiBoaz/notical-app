import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loading } from "notiflix";

export const deleteUserProfile = async (user_id) => {
    const supabase = createClientComponentClient();
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });

        await supabase.from('users').delete().match({ user_id })
        await supabase.from('auth.users').delete().match({ user_id })

        // const { data, error } = await supabase.auth.admin.deleteUser(
        //     '715ed5db-f090-4b8c-a067-640ecee36aa0'
        //   )
    } catch (error) {
        console.error(error)
    } finally {
        Loading.remove();
    }
}