// app/ThemeRegistry.tsx
'use client';
import React, { useMemo } from "react";
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDesignTokens } from '../../src/theme.js';


export default function ThemeRegistry({ children }) {
    // const [mode, setMode] = React.useState<PaletteMode>('light');

    const darkModeTheme = createTheme(getDesignTokens('light'));
    // console.log(theme);
    return (

        <ThemeProvider theme={darkModeTheme} >
            <CssBaseline />
            {children}
        </ThemeProvider>


    );
}


