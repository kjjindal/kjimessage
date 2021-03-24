import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { proflieIsClose, selectUser } from '../features/userSlice';
import '../css/SidebarProfile.css';
import {Edit,ArrowBack} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';


function SidebarProfile(){


    const user=useSelector(selectUser);
    const dispatch=useDispatch();


    const handleSidebarClose=()=>{
        dispatch(proflieIsClose())
    }



    return (
        <>
        <div className="sidebarprofile">
            <div className="sidebarprofile__header">


            <div className="sidebarprofile__headerprofile">
            <IconButton onClick={handleSidebarClose} className="sidebarprofile__headericon">
                 <ArrowBack  />
            </IconButton>
               
                <h3> Profile  </h3>
            </div>

                

            </div>
            <div className="sidebarprofile__center">

                <img src={user?.photo} alt={user?.displayName}   />
                  
  
            </div>
            <div className="sidebarprofile__bottom">
                    <div className="sidebarprofile__bottomheader">
                        <h4> Your Name  </h4>
                        <h3> {user?.displayName}
                        
                            <span> <Edit />  </span>
                            
                              </h3>

                    </div>
                    <div className="sidebarprofile__bottomcenter">
                        <p>This is not your username or pin .This name will be visible to your WhatsApp contacts

                        </p>

</div>
<div className="sidebarprofile__bottombottom">
<h4>About  </h4>
                        <h3> Jai Shree Ram
                            <span> <Edit />  </span>
                            
                              </h3>

</div>


            </div>
           
        </div>


        </>
    )
}


export default SidebarProfile