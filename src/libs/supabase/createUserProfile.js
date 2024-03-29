"use client"
import { Loading } from "notiflix";

export const createUserProfile = async (stripe_customer_id, user_id, email, supabase) => {

    try {
        Loading.dots({
            svgColor: '#0276AA',
            backgroundColor: 'rgba(0,0,0,0.4)',
        });

        return await supabase.from('users').upsert({
            user_id, email, active: false, stripe_customer_id,
        })

    } catch (error) {
        console.log(error.message)
    } finally {
        Loading.remove();
    }
}