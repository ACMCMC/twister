import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../authentication/authenticationSlice';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: {},
        following: {},
        followers: {},
    },
    reducers: {
        addUser: (previousState, action) => {
            const usr = action.payload.user;
            previousState.users[usr._id] = usr;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state, action) => usersSlice.getInitialState());
    }
});

export const { addUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;