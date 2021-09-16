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
import { setStatus } from '../features/statusSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Sidebar(){
    const user=useSelector(selectUser);
    const [sidebarChats,setSidebarChats]=useState([]);
    const dispatch=useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [recent,setrecent]=useState([]);



    const handlestatus=()=>{
        dispatch(setStatus())
    }



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
        const tsToMillis = firebase.firestore.Timestamp.now().toMillis();
        const compareDate = new Date(tsToMillis - (24 * 60 * 60 * 1000))
        db.collection('status').where("seen",'==',false)
        .where('timestamp','>',compareDate)
        .onSnapshot((snapshot)=>{
            setrecent(snapshot.docs.map((doc)=>
           ( {
               id:doc.id,
               data:doc.data()
            })
            ))
        })
        
    },[])



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
        toast("successfully added new group!");
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

                 {recent[0] ? (<Badge color="secondary" overlap="circle" badgeContent=" " variant="dot">
                <DonutLargeIcon   onClick={handlestatus}   />

</Badge>):(<DonutLargeIcon   onClick={handlestatus}   />) }   
                
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
            <ToastContainer position="top-center" autoClose={3000}>
        </ToastContainer>

        </div>
        </>
    )
}


export default Sidebar