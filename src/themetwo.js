'use client'
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const colors = {
    dark: {
        primaryBackgroundColor: "#121926",
        accentBackgroundColor: "#0D121D",
        primaryColor: "#FFFFFF",
        secondaryColor: "#8E9AA5",
    },
    light: {
        primaryBackgroundColor: "#121926",
        accentBackgroundColor: "#0D121D",
        primaryColor: "#0D121D",
        secondaryColor: "#57636C",
    },
};

export const generateTheme = (mode) => {
    const selectedColors = colors[mode];

    return createTheme({
        typography: {
            fontFamily: "'Muli', sans-serif",
            button: {
                textTransform: "none",
                textDecoration: "none",
            },
        },
        palette: {
            primary: {
                main: selectedColors.primaryColor,
            },
            secondary: {
                main: selectedColors.secondaryColor,
            },
            background: {
                default: selectedColors.primaryBackgroundColor,
                paper: selectedColors.accentBackgroundColor,
            },
            text: {
                primary: selectedColors.textColor,
            },
        },
        components: {
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                    },
                },
            },
        },
    });
};


const theme = generateTheme("dark");

export default theme;