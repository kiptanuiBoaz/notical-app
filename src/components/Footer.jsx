"use client"
import React from 'react';
import { usePathname } from 'next/navigation';

export const Footer = () => {
    const pathname = usePathname();
    if (pathname.startsWith('/auth')) return <></>;
    return (
        <div>Footer</div>
    )
}
