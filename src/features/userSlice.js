import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    profile:false,
  },
  reducers: {
    login:( state,action )=> {
  
      state.user=action.payload;
    },
    logout: state => {
      state.user=null;
    },
    proflieIsOpen:(state)=>{
      state.profile=true;
    },
    proflieIsClose:(state)=>{
      state.profile=false;
    },


  },
});

export const { login,logout,proflieIsOpen,proflieIsClose } = userSlice.actions;

export const selectUser = state => state.user.user;
export const selectProfileIsOpen = state => state.user.profile;


export default userSlice.reducer;
