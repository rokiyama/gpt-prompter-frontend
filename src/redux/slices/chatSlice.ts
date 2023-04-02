import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types/chat';
import { RootState } from '../store';

interface ChatState {
  messages: Array<Message>;
}

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
    addMessages: (state, action: PayloadAction<Array<Message>>) => {
      state.messages.push(...action.payload);
    },
  },
});

export const { clearMessages, addMessages } = chatSlice.actions;

export const selectMessages = (state: RootState) => state.chat.messages;

// export default chatSlice.reducer;
