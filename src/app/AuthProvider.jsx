"use client"
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/authSlice';
import { useRouter } from 'next/navigation';

export const AuthProvider = ({ children }) => {
    const currentUser = useSelector(selectUser);
    const router = useRouter();

    // Use useEffect to call router.push after rendering
    // useEffect(() => {
    //     // Check if the user is not logged in and the route is not /auth/login or /auth/signup
    //     if (!currentUser.user_id && !['/auth/login', '/auth/signup', "/auth/callback"].includes(router.pathname)) {
    //         router.push('/auth/login');
    //     }
    // }, [currentUser, router]);

    return <>{children}</>;
};
