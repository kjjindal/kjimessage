import React from 'react';
import '../css/Status.css';
import StatusSidebar from './StatusSidebar';
import StatusVideo from './StatusVideo';


function Status(){
    return (
        <>
        <div className="status">
            <div className="status__body">
                <StatusSidebar  />
                <StatusVideo   />

            </div>

        </div>



        </>
    )
}


export default Status