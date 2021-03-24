import { Button } from '@material-ui/core';
import React from 'react';
import '../css/Login.css';
import {auth,provider} from './firebase';




function Login(){


    const handleSignIn=()=>{


        auth.signInWithPopup(provider)
        .then()
        .catch((err)=>{alert(err)})


    }


    return (
        <>
        <div className="login">
             
             <div className="login__logo">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IMessage_logo.svg/351px-IMessage_logo.svg.png" alt="imessage" />
            <h3> Imessage  </h3>
             </div>
            
            <Button onClick={handleSignIn} > Sign In With Google </Button>
            
        </div>



        </>
    )
}


export default Login