import { createStripeCustomer } from '@/libs/stripe/createStripeCustomer'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);

        // get registered user
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { error, data } = await supabase.from('users').select('*').eq('user_id', user.id).single();

            //user is signing up
            if (error) {
                const stripeCustomer = await createStripeCustomer(user.email)
                await supabase.from('users').upsert({
                    user_id: user.id,
                    email: user.email,
                    active: false,
                    stripe_customer_id: stripeCustomer.id,
                })

            }

        }
    }

    return NextResponse.redirect(new URL('/', req.url))
}