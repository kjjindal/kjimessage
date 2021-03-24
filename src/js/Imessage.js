import React, { useEffect, useState } from 'react';
import '../css/Imessage.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { selectChatId } from '../features/chatSlice';
import SelectChatGroup from './SelectChatGroup';
import { selectProfileIsOpen } from '../features/userSlice';
import SidebarProfile from './SidebarProfile';


function Imessage(){


    const [chatid,setchatid]=useState(null)
    const chatId=useSelector(selectChatId)
    const profile=useSelector(selectProfileIsOpen);


    useEffect(()=>{

    setchatid(chatId)
    },[chatId])
    


    return (
        <>
        <div className="imessage">
            <div className="imessage__header"></div>
            <div className="imessage__body">

                {profile ? (<SidebarProfile />):(<Sidebar />)}

               

            {!chatid ? (
                <SelectChatGroup  />

            ):( <Chat />)} 
            </div>
            
           
            
        </div>


        </>
    )
}


export default Imessage