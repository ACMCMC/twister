import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isAuthenticated: true,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
        }
    }
});

export const { login, logout } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;