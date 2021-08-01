// import { Button } from '@material-ui/core';
import React from 'react';
import '../css/Login.css';
import {auth,provider} from './firebase';
import w1 from '../image/whatsapp1.png';
import w3 from '../image/whatsapp3.jpg';




function Login(){


    const handleSignIn=()=>{


        auth.signInWithPopup(provider)
        .then()
        .catch((err)=>{alert(err)})


    }


    return (
        <>
        {/* <div className="login">
             
             <div className="login__logo">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IMessage_logo.svg/351px-IMessage_logo.svg.png" alt="imessage" />
            <h3> Imessage  </h3>
             </div>
            
            <Button onClick={handleSignIn} > Sign In With Google </Button>
            
        </div> */}
        <div className="login">
        <div className="login__header">
           
              <h2> <img src={w1} alt="web" /> WHATSAPP WEB  </h2>

        </div>
        <div className="login__main">
        <div className="login__upper">
          <div className="login__left">
         <h1> To use Whatsapp on your computer  </h1>
         <ol>
             <li> Copy link & Paste it here   </li>
             <li> Click on <b>  LOGIN </b>  image    </li>
             <li> Use Google authentication  </li>

         </ol>
         <p> Need help to get started ? </p>
        </div>
          <div className="login__right">
        
        <img  onClick={handleSignIn} alt="web" src="https://cdn3.vectorstock.com/i/1000x1000/68/32/login-button-click-color-icon-vector-28806832.jpg" />

        </div>
        </div>
        <div className="login__down">

        <img src={w3} alt="help"  />

        </div>
        
        



        </div>



        </div>
        </>
    )
}


export default Login