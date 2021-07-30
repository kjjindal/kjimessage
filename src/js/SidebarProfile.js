import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { proflieIsClose, selectUser } from '../features/userSlice';
import '../css/SidebarProfile.css';
import {Edit,ArrowBack} from '@material-ui/icons';
import {IconButton,Switch } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function SidebarProfile(){


    const user=useSelector(selectUser);
    const dispatch=useDispatch();


    const handleSidebarClose=()=>{
        dispatch(proflieIsClose())
    }


    const handleTheme=(e)=>{

        if(e.target.checked){
            document.documentElement.style.setProperty('--imessage-color',"#090E11");
            document.documentElement.style.setProperty('--imessage-backgroundcolor','#090E11');
            document.documentElement.style.setProperty('--selectchatgroup-backgroundcolor','#262D31');
            // document.documentElement.style.setProperty('--sidebar-header','#2A2F32');
            // document.documentElement.style.setProperty('--sidebar-chats','#131C21');

            


        }
        else{
            document.documentElement.style.setProperty('--imessage-color',"#009688");
            document.documentElement.style.setProperty('--imessage-backgroundcolor',"#D6DBD9");
            document.documentElement.style.setProperty('--selectchatgroup-backgroundcolor','#F8F9FA');
            // document.documentElement.style.setProperty('--sidebar-header','#F5F5F5');
            // document.documentElement.style.setProperty('--sidebar-chats','#F5F5F5');




        }


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

            
            <FormControlLabel control={ <Switch inputProps={{ 'aria-label': 'primary checkbox' }} onChange={handleTheme}  />   } label="Dark Mode" />


                

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