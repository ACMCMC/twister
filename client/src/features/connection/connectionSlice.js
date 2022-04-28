import { createSlice } from '@reduxjs/toolkit';

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        isConnected: false,
    },
    reducers: {
        registerConnected: (state) => {
            state.isConnected = true;
        },
        registerDisconnected: (state) => {
            state.isConnected = false;
        }
    }
});

export const { registerConnected, registerDisconnected } = connectionSlice.actions;

export const connectionReducer = connectionSlice.reducer;