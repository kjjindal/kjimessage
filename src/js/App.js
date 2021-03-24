import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  login, logout, selectUser } from '../features/userSlice';
import { auth } from './firebase';
import Imessage from './Imessage';
import Login from './Login';
import '../css/App.css';

function App() {

  const user=useSelector(selectUser);
  const dispatch=useDispatch();


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

      ):(
      <Imessage />
      )}


      
     
    </div>
  );
}

export default App;
