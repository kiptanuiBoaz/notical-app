"use client"
import { createSlice } from '@reduxjs/toolkit';

const storedTheme = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('theme'))?.theme : null;

const initialState = {
    theme: storedTheme ? storedTheme : 'dark'
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
