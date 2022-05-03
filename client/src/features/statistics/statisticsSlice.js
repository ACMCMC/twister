import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../authentication/authenticationSlice';

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        statistics: null,
    },
    reducers: {
        setStatistics: (state, action) => {
            const stats = action.payload.statistics;
            state.statistics = stats;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state, action) => statisticsSlice.getInitialState());
    }
});

export const { setStatistics } = statisticsSlice.actions;

export const statisticsReducer = statisticsSlice.reducer;