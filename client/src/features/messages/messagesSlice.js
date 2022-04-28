import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, data) => {
            if (! (state.messages.find(message => message._id === data.payload.message._id))) { // If there is no message with the same id, add it
                state.messages.push(data.payload.message);
            }
        },
    }
});

export const { addMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;