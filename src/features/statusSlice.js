import { createSlice } from '@reduxjs/toolkit';

export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    statusIsOpen:false,
    statusId:null,
    statusUser:null,
    statusUrl:null,
  },
  reducers: {
    setStatus:(state)=>{
state.statusIsOpen=true
    },
    resetStatus:(state)=>{
        state.statusIsOpen=false
            },

     setStatusShow:(state,action)=>{

       state.statusId=action.payload.statusId;
       state.statusUser=action.payload.statusUser;
       state.statusUrl=action.payload.statusUrl;

     }       


  },
});

export const { setStatus,resetStatus,setStatusShow } = statusSlice.actions;

export const selectStatusIsOpen = state => state.status.statusIsOpen;
export const selectStatusId = state => state.status.statusId;
export const selectStatusUser = state => state.status.statusUser;
export const selectStatusUrl = state => state.status.statusUrl;




export default statusSlice.reducer;
