// src/hooks.js
import { handle } from '@sveltejs/kit/auth'
import { supabase } from '$lib/db'

export const handleProtected = handle({
    async getSession(request) {
        const token = request.headers.cookie.replace('sb:token=', '')
        const { data: session, error } = await supabase.auth.api.getUser(token)
        if (error) throw new Error(error.message)
        return session
    },
    async handle({ request, resolve }) {
        const session = await this.getSession(request)
        if (!session) {
            return {
                status: 401,
                headers: {
                    location: '/login',
                },
            }
        }
        return resolve(request)
    },
})