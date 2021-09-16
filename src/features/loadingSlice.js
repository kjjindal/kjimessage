import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading:false,
  },
  reducers: {
    
    setloading: state => {
      state.loading=true;
    },
    unsetloading:state=>{
        state.loading=false;
    }


  },
});

export const { setloading,unsetloading} = loadingSlice.actions;

export const selectloading = state => state.loading.loading;


export default loadingSlice.reducer;
