import { Avatar } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import '../css/Message.css';
import * as timeago from 'timeago.js';




const Message=forwardRef(({timestamp,email,message,photo,imagepost},ref)=>{
   
    const user=useSelector(selectUser);
    return (
        <>
        <div className={`message ${user.email===email && 'message__sender'}`} ref={ref}>
            <Avatar className='message__photo' src={photo}   />
            
            
            <p>{imagepost &&  <img src={imagepost} alt="message"  />  }
               <span>{message} </span> </p>
            <small>{timeago.format(
                 new Date(timestamp?.toDate()).toLocaleString()
            )} </small>
        </div>
        </>
    )
}
);

export default Message