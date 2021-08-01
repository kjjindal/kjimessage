import { Avatar } from '@material-ui/core';
import React from 'react';
import '../css/StatusSidebarStatus.css';
import { useDispatch } from 'react-redux';
import {  setStatusShow } from '../features/statusSlice';


function StatusSidebarStatus({profilepic,name,timestamp,id,statusurl,seen}){


    const dispatch=useDispatch();



    const handleShow=()=>{
          
       

        dispatch(setStatusShow({
            statusId:id,
            statusUser:name,
            statusUrl:statusurl
        }))

       
        // db.collection('status').doc(id).set({
        //     seen:true
        // },{merge:true})


    }


    return (
        <>
        <div className="statussidebarstatus"  onClick={handleShow}   >
            <Avatar className={`statussidebarstatus__avatar  ${seen && 'statussidebarstatus__avatarviewed'}`} src={profilepic} />
            <div className="statussidebarstatus__info">
                <h3>{name} </h3>
                <p> {new Date(timestamp?.toDate()).toLocaleString() } </p>
            </div>

        </div>



        </>
    )
}


export default StatusSidebarStatus
