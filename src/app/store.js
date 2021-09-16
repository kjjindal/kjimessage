import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import chatReducer from '../features/chatSlice';
import cameraReducer from '../features/cameraSlice';
import statusReducer from '../features/statusSlice';
import loadingReducer from '../features/loadingSlice';




export default configureStore({
  reducer: {
    user: userReducer,
    chat:chatReducer,
    camera:cameraReducer,
    status:statusReducer,
    loading:loadingReducer

  },
});
