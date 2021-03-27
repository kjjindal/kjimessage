import { Close,  CameraAlt } from '@material-ui/icons';
import React, { useCallback, useRef} from 'react';
import Webcam from 'react-webcam';
import { useDispatch, useSelector } from 'react-redux';
import './WebcamCapture.css';
import { closeCamera, resetCamerImage, selectCameraImage, setCameraImage } from '../features/cameraSlice';
import { Fab } from '@material-ui/core';





const videoConstraints={
    width:700,
    height:500,
    facingMode:"user"
}


function WebcamCapture(){
    const webcamRef=useRef(null);
    const dispatch=useDispatch();
    const imagesrc=useSelector(selectCameraImage);

    const capture=useCallback(()=>{
        const imageSrc=webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));

    },[webcamRef,dispatch])
   

    const closecamera=()=>{
        dispatch(closeCamera());
        dispatch(resetCamerImage());

    }


    return (

        <>
        <div className="webcamcapture">
            <div className="webcamcapture__header">
                <Close onClick={closecamera} className="webcamcapture__close"   />
                <h3> Take Photo </h3>

            </div>
            <div className="webcamcapture__body">
                {imagesrc ? (
                    <img src={imagesrc} alt="kalpit" />

                ):(
                    <>
<Webcam

                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                width={videoConstraints.width}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
               />
               <Fab color="primary" aria-label="add" className="webcamcapture__cameraicon">
                   <CameraAlt  onClick={capture}  />
</Fab>

                    </>


                )    }
                
            </div>
        </div>



        </>
    )

}


export default WebcamCapture

