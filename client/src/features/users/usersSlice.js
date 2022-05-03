import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../authentication/authenticationSlice';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        following: {},
        followers: {},
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state, action) => usersSlice.getInitialState());
    }
});

export const { } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;