import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../css/StatusSidebar.css';
import {selectUser} from '../features/userSlice';
import StatusSidebarStatus from './StatusSidebarStatus';
import firebase from 'firebase';
import { db, storage } from './firebase';


function StatusSidebar(){
   

    const user =useSelector(selectUser);
    const [recent,setrecent]=useState([]);
    const [viewed,setviewed]=useState([]);
    const [laststatus,setlaststatus]=useState([]);



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
        const tsToMillis = firebase.firestore.Timestamp.now().toMillis();
        const compareDate = new Date(tsToMillis - (24 * 60 * 60 * 1000))
        db.collection('status').where("email",'==',user?.email)
        .where('timestamp','>',compareDate)
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
            setlaststatus(snapshot.docs.map((doc)=>
           ( {
               id:doc.id,
               data:doc.data()
            })
            ))
        })
    },[user?.email])
    

    
   
    useEffect(()=>{
        const tsToMillis = firebase.firestore.Timestamp.now().toMillis();
    const compareDate = new Date(tsToMillis - (24 * 60 * 60 * 1000))
   

        db.collection('status').where("seen",'==',true)
        .where('timestamp','>',compareDate)
        .onSnapshot((snapshot)=>{
            setviewed(snapshot.docs.map((doc)=>
           ( {
               id:doc.id,
               data:doc.data()
            })
            ))
        })
    },[])

   
   

    const handleFile=(e)=>{
        // setimage(e.target.files[0])

        const uploadtask=storage.ref(`status/${e.target.files[0]?.name}`).put(e.target.files[0]);
          uploadtask.on(
              "state_changed",
              snapshot=>{
                
              },
              error=>{
                  console.log(error,"error")
              },
              ()=>{
                  storage
                  .ref("status")
                  .child(e.target.files[0].name)
                  .getDownloadURL()
                  .then(urls=>{
                    db.collection('status').add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        seen:false,
                        statusurl:urls,
                        name:user.displayName,
                        photo:user?.photo,
                        email:user?.email

            
                    })
                     
                  })
              }
          )


        
     
    }






    return (
        <>
        <div className="statussidebar">
            <div className="statussidebar__header">
                <div className="statussidebar__headerleft">
                  <Avatar src={user?.photo}   />
                <div className="statussidebar__info">
                    <h4> My Status </h4>
                    <p>  {recent ? (
                        new Date(laststatus[0]?.data?.timestamp?.toDate()).toLocaleString()
                    ):(
                        'No updates'
                    )} </p>
                </div>  
                </div>
 <Tooltip title="Upload status">
<IconButton variant="contained"
  component="label"   className="statussidebar__uploadstatus">
    <Publish />
  
  <input
    type="file"
    hidden
    onChange={handleFile} 
    onClick={(event)=> { 
      event.target.value = null
 }}
  />

                
            </IconButton>
 </Tooltip>
 

                
               
               
     

            </div>
            <div className="statussidebar__status">
                <div className="statussidebar__recent">
                    <div class="line">
                        <hr /> 
                        <p> Recent </p>
                    </div>
                    
                   {recent.map(({id,data:{statusurl,name,timestamp,photo,seen}})=>(
                     <StatusSidebarStatus id={id} seen={seen} key={id} statusurl={statusurl} timestamp={timestamp} name={name}  profilepic={photo}  />  
                   ))

                   }
                    
                  
                    
                   
                    
                   


                </div>
                <div className="statussidebar__viewed">
                <div class="line">
                        <hr /> 
                        <p> Viewed </p>
                    </div>
                    {viewed.map(({id,data:{statusurl,name,timestamp,photo,seen}})=>(
                     <StatusSidebarStatus id={id} seen={seen} key={id} statusurl={statusurl} timestamp={timestamp} name={name}  profilepic={photo}  />  
                   ))

                   }
                    

                    
                </div>

            </div>

            
        </div>



        </>
    )
}


export default StatusSidebar;