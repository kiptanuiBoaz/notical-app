import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const { data: { user } } = await supabase.auth.getUser()

    // if user is not signed in and the current path is not / redirect the user to /
    if (!user) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    return res
}

export const config = {
    matcher: ['/', '/account', "/connections", "/subscriptions"],
}