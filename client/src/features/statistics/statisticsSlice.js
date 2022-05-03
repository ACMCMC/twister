import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../authentication/authenticationSlice';

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        likes: 0,
    },
    reducers: {
        setLikes: (state, action) => {
            const stats = action.payload.likes;
            state.likes = stats;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state, action) => statisticsSlice.getInitialState());
    }
});

export const { setLikes } = statisticsSlice.actions;

export const statisticsReducer = statisticsSlice.reducer;