import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
    typography: {
        fontFamily: "'Muli', sans-serif",
        button: {
            textTransform: "none",
            textDecoration: "none",
        },
    },
    palette: {
        primary: {
            main: '#0276aa', // Black color for primary
        },
        secondary: {
            main: '#333333', // Dark grey color for secondary
        },
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: 10, // change this line
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;