import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: {},
    },
    reducers: {
        addMessage: (state, data) => {
            const msg = data.payload.message;
            state.messages[msg.getId()] = msg;
        },
    }
});

export const { addMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;