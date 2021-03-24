import React, { useEffect, useState } from 'react';
import '../css/Sidebar.css';
import {Avatar, Badge, IconButton, Tooltip,Menu,MenuItem} from '@material-ui/core';
import {Search,MoreVert} from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import {  auth, db } from './firebase';
import { proflieIsOpen, selectUser } from '../features/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import firebase from 'firebase';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';


function Sidebar(){
    const user=useSelector(selectUser);
    const [sidebarChats,setSidebarChats]=useState([]);
    const dispatch=useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const handleSignOut = () => {
          auth.signOut();
      };



    useEffect(()=>{
        db.collection('chatgroup')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
            setSidebarChats(snapshot.docs.map((doc)=>
            ({
                id:doc.id,
                data:doc.data()
            })
          


            ))
        })
    },[])

    
    const addChannel=()=>{
        var chatname=prompt('enter group  name');
        if(chatname){
            db.collection('chatgroup').add({
            chatName:chatname,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            chatPhoto:user?.photo,
            chatEmail:user?.email
        
        }) 
        }
       
    }

    const handleProfile=()=>{
        dispatch(proflieIsOpen())
    }


    return (
        <>
        <div className="sidebar">
            <div className="sidebar__header">
                <Tooltip title={user?.displayName}>
                <Avatar className="sidebar__avatar" src={user?.photo} onClick={handleProfile}  />

                </Tooltip>
                
                <div className="sidebar__icons">

                <Tooltip title="status">
                <IconButton  variant="outlined" className="sidebar__inputbutton" >
                <Badge color="secondary" overlap="circle" badgeContent=" " variant="dot">
                <DonutLargeIcon   />

</Badge>
                </IconButton>
                </Tooltip>


                <Tooltip title="chat">
                    <IconButton  variant="outlined" className="sidebar__inputbutton" >
                <ChatIcon    />
                </IconButton>
                </Tooltip>


                



                <Tooltip title="Menu">
    
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
  <MoreVert />
</IconButton>
</Tooltip>
            
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem  onClick={handleProfile} >Profile</MenuItem>
  <MenuItem onClick={addChannel} >Add Group</MenuItem>
  
  <MenuItem onClick={handleSignOut}>Logout</MenuItem>
</Menu>

                    
                </div>
                

            </div>
            <div className="sidebar__search">
                <div className="sidebar__input">
                    <Search  />
                    <input type="text" placeholder="Search or start a new chat" />
                </div>
            </div>
            <div className="sidebar__chats">
                {sidebarChats.map(({id,data:{chatName,chatPhoto,chatEmail}})=>

                <SidebarChat key={id}  id={id} chatName={chatName} chatPhoto={chatPhoto} chatEmail={chatEmail}   />
                   )}

            </div>

        </div>
        </>
    )
}


export default Sidebar