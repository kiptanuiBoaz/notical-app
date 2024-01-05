"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getUser = async (id) => {
    const supabase = createClientComponentClient();
    try {
        const res = await supabase.from('users').select('*').eq('user_id', id).single();
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
};