import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isAuthenticated: true,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        }
    }
});

export const { login, logout } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;