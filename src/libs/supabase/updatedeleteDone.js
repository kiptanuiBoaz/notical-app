import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const updateDeleteDone = async (user_id, email, delete_done) => {
    const supabase = createClientComponentClient();
    try {
        const { error, data } = await supabase.from('users').upsert({
            user_id,
            email,
            delete_done
        })

        if (error) throw error;
        if (data) return data;

    } catch (error) {
        console.error(error.message)
    }

}
