'use client';
import React, { useMemo } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from '../theme.js';
import { useSelector } from "react-redux";
import dynamic from 'next/dynamic';
import { selectTheme } from "../redux/features/themeSlice.js";
const Navbar = dynamic(() => import('../components/Navbar.jsx'), { ssr: false })


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


