"use client"
import React from 'react';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
    const pathname = usePathname();
    if (pathname.startsWith('/auth')) return <></>;

    return (
        <div>Navbar</div>
    )
}
