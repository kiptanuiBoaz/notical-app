import { createSlice } from '@reduxjs/toolkit';

// Determine the initial theme based on system preferences or local storage
export const getDefaultTheme = () => {
    if (typeof window !== 'undefined') {
        // Check local storage for the "theme" variable
        const storedTheme = JSON.parse(localStorage.getItem('theme')).theme;
        if (storedTheme) {
            return storedTheme;
        }
        else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    }
}

const prefersDarkTheme = getDefaultTheme();
const initialState = {
    theme: prefersDarkTheme ? 'dark' : 'light',
};

// Managing theme
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        TOGGLE_THEME: (state, action) => {
            state.theme = action.payload.theme;
            // Save the theme to local storage
            // localStorage.setItem('theme', action.payload.theme);
        },
    },
});

// Make action available for all components
export const { TOGGLE_THEME } = themeSlice.actions;

// Reducer to store
export default themeSlice.reducer;

// Reference to theme state
export const selectTheme = (state) => state.theme.theme;
