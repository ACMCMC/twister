import { createAction, createSlice } from '@reduxjs/toolkit';
import { messagesSlice } from '../messages/messagesSlice';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, data) => {
            console.log("Logged in!", data.payload.user);
            return {user: data.payload.user};
        },
        logout: (state, data) => {
            console.log("Logged out!");
            return {user: null};
        }
    },
});

export const { login } = authenticationSlice.actions;
export const { logout } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;