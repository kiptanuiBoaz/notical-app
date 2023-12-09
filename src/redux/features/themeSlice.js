"use client"
import { createSlice } from '@reduxjs/toolkit';

// Determine the initial theme based on system preferences
export const getDefautlTheme = () => {
    if (typeof window !== 'undefined') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    }

}
const prefersDarkTheme = getDefautlTheme()
const initialState = {
    theme: prefersDarkTheme ? 'dark' : 'light',
};

// Managing theme
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        TOGGLE_THEME: (state, action) => {
            console.log("fired")
            state.theme = action.payload.theme;
        },
    },
});

// Make action available for all components
export const { TOGGLE_THEME } = themeSlice.actions;

// Reducer to store
export default themeSlice.reducer;

// Reference to theme state
export const selectTheme = (state) => state.theme.theme;