import { ArrowBack, Close } from '@material-ui/icons';
import React, {  useState } from 'react';
import '../css/StatusVideo.css';
import {DonutLarge} from '@material-ui/icons';
import { resetStatus, selectStatusId, selectStatusUrl, setStatusShow } from '../features/statusSlice';
import { useDispatch, useSelector } from 'react-redux';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import { LinearProgress } from '@material-ui/core';
import { db } from './firebase';


function StatusVideo(){



    const dispatch=useDispatch();
    const statusid=useSelector(selectStatusId);
    const statusurl=useSelector(selectStatusUrl);
    const [progress,setprogress]=useState(0);


    
    const handleclosestatus=()=>{
        dispatch(resetStatus());
        dispatch(setStatusShow({
            statusId:null,
            statusUrl:null,
            statusName:null,
        }))
    }
    const exits=()=>{
        dispatch(setStatusShow({
            statusId:null,
            statusUrl:null,
            statusName:null,
        }))
    }
    
    return (
        <>
        <div className="statusvideo">
            <div className="statusvideo__header">
                <ArrowBack className="statusvideo__back"  onClick={exits}    />
                <Close className="statusvideo__close" onClick={handleclosestatus} />
            </div>


            {!statusid ? (
                <div className="statusvideo__withoutvideo">

<div className="statusvideo__center">
   <DonutLarge  className="statusvideo__donuticon"    />
<h3> Click on a contact to view their status updates  </h3>

</div>



</div>

            ):(
 <div className="statusvideo__video">
                <div className="statusvideo__videoimage">
                    <div className="statusvideo__progress">
                    <LinearProgress variant="determinate" value={progress} />
                        </div>
                
                <div className="statusvideo__timer">
                 <CountdownCircleTimer 
                        isPlaying
                        duration={20}
                        size={40}

                        strokeWidth={3}
                        colors={
                            [
                                ["#FF9933",0.33],
                                ["#FFFFFF",0.33],
                                ["#138808",0.33]
                            ]
                        }
>

{({remainingTime})=>{
    if(remainingTime===0){

        db.collection('status').doc(statusid).set({
            seen:true
        },{merge:true})

        exits();

    }
    setprogress((20-remainingTime)*5)
    return remainingTime

}}

</CountdownCircleTimer >
            </div>
                <img src={statusurl} alt='KaLpIt'  />
                </div>
            </div>
            ) }
        </div>
        </>
    )
}


export default StatusVideo