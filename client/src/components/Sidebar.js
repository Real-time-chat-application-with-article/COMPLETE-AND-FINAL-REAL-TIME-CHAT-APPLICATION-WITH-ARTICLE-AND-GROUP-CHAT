import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar'
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';
import { FaImage, FaPodcast } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from '../redux/userSlice';
import "./sidebar.css"
import logo from'../images/logo1.png'
import default_img from'../images/default.png'
import IndividualChat from './IndividualChat';
import GroupChat from './GroupChat';
import Contacts from './Contacts';

const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const [editUserOpen,setEditUserOpen] = useState(false)
    const [allUser,setAllUser] = useState([])
    const [openSearchUser,setOpenSearchUser] = useState(false)
    const socketConnection = useSelector(state => state?.user?.socketConnection)
    const dispatch = useDispatch()
    const navigate = useNavigate()

  // THIS EFFECT IS RESPONSIBLE FOR  FOR USER MESSAGES
    useEffect(()=>{
        if(socketConnection){
            socketConnection.emit('sidebar',user._id)
            
            socketConnection.on('conversation',(data)=>{
                console.log('conversation',data)
                
                const conversationUserData = data.map((conversationUser,index)=>{
                    if(conversationUser?.sender?._id === conversationUser?.receiver?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser?.sender
                        }
                    }
                    else if(conversationUser?.receiver?._id !== user?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser.receiver
                        }
                    }else{
                        return{
                            ...conversationUser,
                            userDetails : conversationUser.sender
                        }
                    }
                })

                setAllUser(conversationUserData)
            })
        }
 
        
    },[socketConnection,user])

//====================================================================================================
//THIS FUNCTION RESPONSIBLE SIGN OUT OUR USER, SENDING THEM BACK TO EMAIL PAGE
//LOGOUT, THE TERMINATES THE TOKEN ASSIGNED TO IT AFTER SIGNING IN    
    const handleLogout = ()=>{
        dispatch(logout())
        navigate("/email")
        localStorage.clear()
    }

    const [ClickState, setClickState] = useState("chat")
    const [ActiveNabar, setActiveNavbar] = useState(<IndividualChat/>);
    const relocate = useNavigate(); 
    
    const ViewGroup = () =>{  
        //relocate("/groupchat")
        setClickState("group")  
        setActiveNavbar(<GroupChat/>) 
    }
    const  ViewChat = () => {
        setActiveNavbar(<IndividualChat/>)
        setClickState("chat")
    }
    const ViewContact = () => {
        setActiveNavbar(<Contacts ViewChat={ViewChat}/>)
        setClickState("contact")
    }

  return (
    <div className='sidebar'>

                   <div className='small-sidebar'>
        <div className='icons-set'>

        <div className={`icons ${ClickState === "chat" ? "active": undefined}`} onClick={ViewChat}>
          <abbr title="My Chats">   <ion-icon  name="chatbubble-ellipses" ></ion-icon> </abbr>
        </div>

        <div className={`icons  ${ClickState === "group" ? "active": undefined}`} onClick={ViewGroup}>
           <abbr title="My Group Chats">   <ion-icon  name="people-circle" ></ion-icon> </abbr> 
        </div>

           <div className={`icons  ${ClickState === "contact" ? "active": undefined} `} onClick={ViewContact}>
           <abbr title="My calls">  <ion-icon  name="person-add" ></ion-icon> </abbr> 
           </div>
          
           <div className="settings">
           <div className="icons">
           <abbr title="create article"onClick={(e)=>{navigate('/articles')}}> 
            <ion-icon  name="create" ></ion-icon>
            </abbr>
           </div>
           </div>

        </div>

        <div className='foot'>
            <button className='im' title={user?.name} onClick={()=>setEditUserOpen(true)}>
               <img src={ user?.profile_pic || default_img} alt={user?.name}/>              
            </button>
            <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-700 rounded' onClick={handleLogout}>
                <span className='-ml-2'>
                    <BiLogOut size={40} color='white'/>
                </span>
            </button>
        </div>
                   </div>
                   
            {
              ActiveNabar
            }
                   
                    

            {/**edit user details*/}
            {
                editUserOpen && (
                    <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
                )
            }

            {/**search user */}
            {
                openSearchUser && (
                    <SearchUser onClose={()=>setOpenSearchUser(false)}/>
                )
            }

    </div>
  )
}

export default Sidebar
