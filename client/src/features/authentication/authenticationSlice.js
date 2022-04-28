import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, data) => {
            state.user = data.payload.user;
            console.log("Logged in!", state.user);
        },
        logout: (state) => {
            state.user = null;
            console.log("Logged out");
        }
    }
});

export const { login, logout } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;