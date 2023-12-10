// app/ThemeRegistry.tsx
'use client';
import React, { useMemo } from "react";
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from '../theme.js';
import { useSelector } from "react-redux";
import { selectTheme } from "@/redux/features/themeSlice.js";
import { Navbar } from "@/components/Navbar.jsx";


export default function ThemeRegistry({ children }) {
    //selected theme from redux
    const colorMode = useSelector(selectTheme);

    //create theme

    const selectedTheme = useMemo(() => createTheme(getDesignTokens(colorMode)), [colorMode]);
    return (
        <ThemeProvider theme={selectedTheme} >
            <CssBaseline />
            <Navbar />
            {children}
        </ThemeProvider>
    );
}


