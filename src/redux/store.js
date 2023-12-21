"use client";
import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/themeSlice";
import authReducer from './features/authSlice';
import authMethodSlice from "./features/authMethodSlice";

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        auth: authReducer,
        authMethod: authMethodSlice
    },
    devTools: process.env.NODE_ENV !== "production",

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),

});

//persist state
store.subscribe(() => {
    localStorage.setItem("theme", JSON.stringify(store.getState().theme));
    localStorage.setItem("user", JSON.stringify(store.getState().auth));
});


// ambient declaration