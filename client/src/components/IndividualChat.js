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
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from '../redux/userSlice';
import "./sidebar.css"
import logo from'../images/logo1.png'
import default_img from'../images/default.png'

function IndividualChat() {
    const user = useSelector(state => state?.user)
    const [editUserOpen,setEditUserOpen] = useState(false)
    const [allUser,setAllUser] = useState([])
    const [openSearchUser,setOpenSearchUser] = useState(false)
    const socketConnection = useSelector(state => state?.user?.socketConnection)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

  return (
    <div className='big-sideBar'>

            <div className='logo-head'>
           <img className='logo' width={'250px'} 
            src={logo}
            alt='logo'
          />
         
                </div>
                <h2>Recent Messages</h2>
                <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                    {
                        allUser.length === 0 && (
                            <div className='mt-12 content'>
                                <div className='flex justify-center items-center my-4 text-slate-500'>
                                    <FiArrowUpLeft
                                        size={50}
                                    />
                                </div>
                                <p className='text-lg text-center text-slate-400'>You haven't yet chatted with anyone</p>    
                            </div>
                        )
                    }

                    {
                        allUser.map((conv,index)=>{
                            return(
                                <NavLink to={"/"+conv?.userDetails?._id} key={conv?._id} className='user-infomation'>
                                    <div>
                                        <img src={conv?.userDetails?.profile_pic} alt={conv?.userDetails?.name}/>
                                        
                                    </div>
                                    <div>
                                        <h3 className='MesagesText'>{conv?.userDetails?.name}</h3>
                                        <div className='text-slate-500 text-xs flex items-center gap-1 mst-text'>
                                            <div className='sms'>
                                                {
                                                    conv?.lastMsg?.imageUrl && (
                                                        <div className='flex items-center gap-1'>
                                                            <span><FaImage color='purple'/></span>
                                                            {!conv?.lastMsg?.text && <span>Image</span>  } 
                                                        </div>
                                                    )
                                                }
                                                {
                                                    conv?.lastMsg?.videoUrl && (
                                                        <div className='flex items-center gap-1'>
                                                            <span><FaVideo/></span>
                                                            {!conv?.lastMsg?.text && <span>Video</span>}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <p className='txt'>{conv?.lastMsg?.text}</p>
                                        </div>
                                    </div>
                                    {
                                        Boolean(conv?.unseenMsg) && (
                                            <p className='unseen'>{conv?.unseenMsg}</p>
                                        )
                                    }

                                </NavLink>
                            )
                        })
                    }
                </div>
                      
                      
            </div>
  )
}

export default IndividualChat
