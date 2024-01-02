import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const updateSelectedDbIds = async (user_id, email, selected_databases_ids) => {
    const supabase = createClientComponentClient();
    try {
        const { error, data } = await supabase.from('users').upsert({
            user_id,
            email,
            selected_databases_ids
        })

        if (error) throw error;
        if (data) return data;

    } catch (error) {
        console.error(error.message)
    }

}
