import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast'
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import logo from'../images/logo1.png'

const SearchContacts = ({onClose}) => {
    const [searchUser,setSearchUser] = useState([])
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState("")


    const handleSearchUser = async()=>{
        const URL = `http://192.168.156.157:8080/api/search-user`
        try {
            setLoading(true)
            const response = await axios.post(URL,{
                search : search
            })
            setLoading(false)

            setSearchUser(response.data.data)

        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }

    useEffect(()=>{
        handleSearchUser()
    },[search])

    console.log("searchUser",searchUser)

  return (
    <div className='big-sideBar'>
              <div className='logo-head'>
           <img className='logo' width={'250px'} 
            src={logo}
            alt='logo'
          />
         
                </div>
                <h2>Available Users</h2>

                <div className='input-box'>
                <input 
                    type='text'
                    placeholder='search user here...'
                    className='w-full outline-none py-1 h-full px-4'
                    onChange={(e)=>setSearch(e.target.value)}
                    value={search}
                />
                <div className='search-icons'>
                    <IoSearchOutline size={35}/>
                </div>
                 </div>

                 <div className='contact-content'>
                          
                </div>
    </div>
  )
}

export default SearchContacts
