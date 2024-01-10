"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loading } from "notiflix";

export const getUserProfile = async (id) => {
    const supabase = createClientComponentClient();
    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });
        const res = await supabase.from('users').select('*').eq('user_id', id).single();
        return res.data;
    } catch (error) {
        console.error(error.message);
    } finally {
        Loading.remove()
    }
};