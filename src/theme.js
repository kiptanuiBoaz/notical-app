"use client"
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectTheme } from "./redux/features/themeSlice";

const colors = {
    dark: {
        primaryBackgroundColor: "#121926",
        accentBackgroundColor: "#0D121D",
        primaryColor: "#FFFFFF",
        secondaryColor: "#cccc",
    },
    light: {
        primaryBackgroundColor: "#F1F4F8",
        accentBackgroundColor: "#FFFFFF",
        primaryColor: "#0D121D",
        secondaryColor: "#57636C",
    },
};

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...({
            primary: {
                main: colors[mode].primaryColor
            },
            secondary: {
                main: colors[mode].secondaryColor,
            },
            background: {
                default: colors[mode].primaryBackgroundColor,
                paper: colors[mode].accentBackgroundColor,
            },
            text: {
                primary: colors[mode].primaryColor, // Use primaryColor or secondaryColor here
            },
        }),
    },
});

const theme = createTheme(() => {
    const colorMode = useSelector(selectTheme());
    return colorMode;
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
