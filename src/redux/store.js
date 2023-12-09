"use client";
import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/themeSlice";


export const store = configureStore({
    reducer: {
        theme: themeSlice,

    },
    devTools: process.env.NODE_ENV !== "production",

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),

});

//persist state
store.subscribe(() => {
    localStorage.setItem("theme", JSON.stringify(store.getState().theme));
});


// ambient declaration