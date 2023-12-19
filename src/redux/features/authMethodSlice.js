"use client"
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authMethod: null,
};

// Managing theme
const authMethodSlice = createSlice({
    name: 'authMethod',
    initialState,
    reducers: {
        TOGGLE_AUTH_METHOD: (state, action) => {
            state.authMethod = action.payload.authMethod;

        },
    },
});

// Make action available for all components
export const { TOGGLE_AUTH_METHOD } = authMethodSlice.actions;

// Reducer to store
export default authMethodSlice.reducer;

// Reference to theme state
export const selectAuthMethod = (state) => state.authMethod.authMethod;
