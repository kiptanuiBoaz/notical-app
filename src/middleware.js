import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({ req, res });
    const { data: { user } } = await supabase.auth.getUser();

    console.log('User:', user);
    console.log('Path:', req.nextUrl.pathname);

    // if (!user && req.nextUrl.pathname !== '/auth/signup') {
    //     console.log('Redirecting to /auth/login');
    //     return NextResponse.redirect(new URL('/auth/login', req.url));
    // }

    return res;
}


export const config = {
    matcher: ["/", "/connections", "/account", "/subscriptions"]
}


