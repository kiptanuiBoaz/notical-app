"use client"
import { createSlice } from '@reduxjs/toolkit';


const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user")["user"] : null;

const initialState = storedUser ? JSON.parse(storedUser) : {
    user: {
        user_id: null,
        email: null,
        full_name: '',
        avatarUrl: null,
        role: {
            id: null,
            name: ""
        },

    }
};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        UPDATE_AUTH: (state, action) => {
            state.user = action.payload;
        },

        RESET_AUTH: (state) => {
            state.user = {
                user: {
                    user_id: null,
                    email: null,
                    full_name: '',
                    avatarUrl: null,
                    role: {
                        id: null,
                        name: ""
                    },

                }
            }
            // Create a deep copy of initialState.user

        },

    },
});

export const { UPDATE_AUTH, RESET_AUTH } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state?.auth?.user;