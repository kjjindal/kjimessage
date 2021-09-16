import React, { useEffect, useState } from 'react';
import '../css/Imessage.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { selectChatId } from '../features/chatSlice';
import SelectChatGroup from './SelectChatGroup';
import { selectProfileIsOpen } from '../features/userSlice';
import SidebarProfile from './SidebarProfile';
import { selectloading } from '../features/loadingSlice';
import LoadingBar from 'react-top-loading-bar'



function Imessage(){


    const [chatid,setchatid]=useState(null)
    const chatId=useSelector(selectChatId)
    const profile=useSelector(selectProfileIsOpen);
    const [progress, setProgress] = useState(100);
    const loading=useSelector(selectloading);
    
   
    useEffect(()=>{
    setchatid(chatId)
    },[chatId])



    







    return (
        <>
        {loading? <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        loaderSpeed={1000}
      />:null}
        
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





