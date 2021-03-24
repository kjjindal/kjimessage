import React from 'react';
import '../css/SelectChatGroup.css';

const SelectChatGroup = () => {

    return (
        <>
        <div className="selectchatgroup">
            <div className="selectchatgroup__box">
                <img src="https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg" alt="selectchatgroup" />
                 <h3> Keep your phone connected  </h3>
                 <p> WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.  </p>
                 <hr />
                 <p>WhatsApp is available for Windows.<span>Get it here </span> </p>
            </div>
{/* 
            <input type="file" onChange={handlefile}  />
            <button onClick={handleupload}>  Upload </button> */}

            
        </div>
        </>
    )
}

export default SelectChatGroup
