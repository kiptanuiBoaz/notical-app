"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from 'notiflix';

export default function LoadingComponent() {
    // Get the router object
    const router = useRouter();

    // Use useEffect to start and stop the loading animation on router events
    useEffect(() => {
        // Define a function to start the loading animation
        const handleStart = () => {
            Loading.dots({
                svgColor: '#4d7e3e',
                backgroundColor: 'rgba(0,0,0,0.4)',
            });
        };

        // Define a function to stop the loading animation
        const handleStop = () => {
            Loading.remove();
        };



        // Remove event listeners on component unmount
        return () => {
            handleStop();
        };
    }, [router]);

    // Return an empty component
    return null;
}
