"use client"
import { createSlice } from '@reduxjs/toolkit';

const pseudoInitialState = {
    stripe: {
        customerId: null,
        subscriptionEnd: null,
        stripeSubscriptionStatus: false,
        subscriptionPlan: null,
        subscriptionInterval: null,
    },
    connectionStatus: {
        notion: null,
        google: null,
    },
    user_id: null,
    email: null,
    full_name: '',
    avatarUrl: null,
    role: {
        id: null,
        name: ""
    },
}

const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null;

const initialState = storedUser ? JSON.parse(storedUser) : {
    user: pseudoInitialState

};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        UPDATE_AUTH: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },

        UPDATE_CONNECTION_STATUS: (state, action) => {
            state.user.connectionStatus = {
                ...state.user.connectionStatus,
                ...action.payload.connectionStatus,
            }
        },

        RESET_AUTH: (state) => {
            state.user = pseudoInitialState
        },

    },
});

export const { UPDATE_AUTH, RESET_AUTH, UPDATE_CONNECTION_STATUS } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state?.auth?.user;