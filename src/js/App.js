import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  login, logout, selectUser } from '../features/userSlice';
import { auth } from './firebase';
import Imessage from './Imessage';
import Login from './Login';
import '../css/App.css';
import Status from './Status';
import { selectStatusIsOpen } from '../features/statusSlice';

function App() {

  const user=useSelector(selectUser);
  const dispatch=useDispatch();
  const status=useSelector(selectStatusIsOpen);
  


  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){

        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName:authUser.displayName
        }))
      }
      else{
        dispatch(logout())
      }
    })

  },[dispatch])


  

   
  return (
    <div className="app">
      {!user ? (
        <Login />

      ):
       !status ? (<Imessage />):(<Status />)
      
      }


      
     
    </div>
  );
}

export default App;
