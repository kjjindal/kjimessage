import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: null,
    chatName:null,
    chatEmail:null
  },
  reducers: {
    setChat:( state,action )=> {
  
      state.chatId=action.payload.chatId;
      state.chatName=action.payload.chatName;
      state.chatEmail=action.payload.chatEmail;


    }
  },
});

export const { setChat} = chatSlice.actions;

export const selectChatName = state => state.chat.chatName;
export const selectChatId = state => state.chat.chatId;
export const selectChatEmail = state => state.chat.chatEmail;



export default chatSlice.reducer;
