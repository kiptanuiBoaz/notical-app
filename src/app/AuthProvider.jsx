"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from "../redux/features/authSlice";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

export const AuthProvider = ({ children }) => {
    const currentUser = useSelector(selectUser);
    const router = useRouter();


    // Use useEffect to call router.push after rendering
    useEffect(() => {
        if (!currentUser.user_id) {
            router.push("/auth/login")
        }
    }, [currentUser, router]);

    return <>
        {children}
    </>

}