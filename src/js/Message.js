import { Avatar, MenuItem,Menu } from '@material-ui/core';
import React, { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import '../css/Message.css';
import * as timeago from 'timeago.js';
import { ExpandMore } from '@material-ui/icons';
import { selectChatId } from '../features/chatSlice';
import { db } from './firebase';




const Message=forwardRef(({timestamp,id,email,message,photo,imagepost},ref)=>{
   
    const user=useSelector(selectUser);
    const [anchorEl, setAnchorEl] = useState(null);
    const chatid=useSelector(selectChatId);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleDelete=()=>{
          setAnchorEl(null);
          db.collection('chatgroup')
          .doc(chatid)
          .collection('messages').doc(id).delete()
      }

    return (
        <>
        <div className={`message ${user.email===email && 'message__sender'}`} ref={ref}>
            <Avatar className='message__photo' src={photo}   />
            
            
            <p>
                {imagepost &&  <img src={imagepost} alt="message"  />  }
               <span>{message} </span> 
               {user.email===email && 
               <ExpandMore aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="message__expandicon"   />
               
               
               }
             <Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem>View</MenuItem>

  <MenuItem onClick={handleDelete}>Delete message</MenuItem>
  
</Menu>
            
            </p>
            <small>{timeago.format(
                 new Date(timestamp?.toDate()).toLocaleString()
            )} </small>
        </div>
        </>
    )
}
);

export default Message