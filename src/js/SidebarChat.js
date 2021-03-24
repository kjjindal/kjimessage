import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../css/SidebarChat.css';
import {setChat} from '../features/chatSlice';
import { db } from './firebase';
import * as timeago from 'timeago.js';
import {ExpandMore} from '@material-ui/icons';


function SidebarChat({id,chatName,chatPhoto,chatEmail}){

    const dispatch=useDispatch();
    const [chatInfo,setChatInfo]=useState([]);

  useEffect(()=>{
      db.collection('chatgroup')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot)=>{
          setChatInfo(snapshot.docs.map((doc)=>
              doc.data()
          ))
      })


  },[id])
    const handleChat=()=>{

dispatch(setChat({
    chatId:id,
    chatName:chatName,
    chatEmail:chatEmail,
}))

    }
    return (
        <>
        <div className="sidebarchat"  onClick={handleChat}>
            <Avatar  src={chatPhoto} />
            <div className="sidebarchat__info"> 
                <h3> {chatName} </h3>
                 <p> {chatInfo[0]?.message} </p>
                <small>
                {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
                    </small>
                    {chatInfo[0] ? <ExpandMore   className="sidebarchat__icon" /> : null }
            </div>
        </div>
        </>
    )
}

export default SidebarChat