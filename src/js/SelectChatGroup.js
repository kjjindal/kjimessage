import React from 'react';
import '../css/SelectChatGroup.css';
import w2 from '../image/whatsapp2.jpg';


const SelectChatGroup = () => {

    return (
        <>
        <div className="selectchatgroup">
            <div className="selectchatgroup__box">
                <img src={w2} alt="selectchatgroup" />
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
