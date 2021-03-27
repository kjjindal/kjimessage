import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'camera',
  initialState: {
     cameraIsOpen:false,
     cameraImage:null
    
  },
  reducers: {
    openCamera:( state,action )=> {
  
      state.cameraIsOpen=true
    },
    closeCamera:(state)=>{
      state.cameraIsOpen=false
    },
    setCameraImage:(state,action)=>{
      state.cameraImage=action.payload

    },
    resetCamerImage:(state)=>{
      state.cameraImage=null

    }


  },
});

export const { openCamera,closeCamera,setCameraImage,resetCamerImage } = userSlice.actions;

export const selectCamera = state => state.camera.cameraIsOpen;
export const selectCameraImage = state => state.camera.cameraImage;



export default userSlice.reducer;
