import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../authentication/authenticationSlice';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        following: [],
        followers: [],
    },
    reducers: {
        setFollowers: (state, action) => {
            state.followers = action.payload.followers;
        },
        setFollowing: (state, action) => {
            state.following = action.payload.following;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state, action) => usersSlice.getInitialState());
    }
});

export const { setFollowers, setFollowing } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;