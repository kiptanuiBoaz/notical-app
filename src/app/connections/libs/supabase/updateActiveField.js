import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const updateActiveField = async (user_id, email, active) => {
    const supabase = createClientComponentClient();
    try {
        const { error, data } = await supabase.from('users').upsert({
            user_id,
            email,
            active
        })

        if (error) throw error;
        if (data) return data;

    } catch (error) {
        console.error(error.message)
    }

}
