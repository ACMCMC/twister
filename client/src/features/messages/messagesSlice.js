import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../authentication/authenticationSlice';

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: {},
    },
    reducers: {
        addMessage: (state, data) => {
            const msg = data.payload.message;
            state.messages[msg._id] = msg;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state, action) => messagesSlice.getInitialState());
    }
});

export const { addMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;