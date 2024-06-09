import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import uploadFile from '../helpers/uploadFile'
import Divider from './Divider'
import axios from 'axios'
import taost from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import  "./editUser.css"
import default_img from "../images/default.png"


const EditUserDetails = ({onClose,user}) => {
    const [data,setData] = useState({
        
        name : user?.user,
        profile_pic : user?.profile_pic
    })
    const uploadPhotoRef = useRef()
    const dispatch = useDispatch()

    useEffect(()=>{
        setData((preve)=>{
            return{
                ...preve,
                ...user
            }
        })
    },[user])

    const handleOnChange = (e)=>{
        const { name, value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleOpenUploadPhoto = (e)=>{
        e.preventDefault()
        e.stopPropagation()

        uploadPhotoRef.current.click()
    }
    const handleUploadPhoto = async(e)=>{
        const file = e.target.files[0]

        const uploadPhoto = await uploadFile(file)

        setData((preve)=>{
        return{
            ...preve,
            profile_pic : uploadPhoto?.url
        }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`

            const response = await axios({
                method : 'post',
                url : URL,
                name : data.name,
                profile_pic: data.profile_pic,
                withCredentials : true
            })

            console.log('response',response)
            taost.success(response?.data?.message)
            
            if(response.data.success){
                dispatch(setUser(response.data.data))
                onClose()
            }
         
        } catch (error) {
            console.log(error)
            taost.error(error)
        }
    }
  return (
        <div className='editUser'>
            <h2 className='font-semibold'>Edit Profile Details</h2>
          

            <form className='form' onSubmit={handleSubmit}>
                <div className='input-box'>
                    <label htmlFor='name'>Full Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={data.name }
                        onChange={handleOnChange}
                        className={data.name ? 'nothing' : undefined}
                    />
                </div>

                <div>
                    <div className='box'>
                            <img src={data?.profile_pic || default_img} alt={data?.name}/>
                        
                        <label htmlFor='profile_pic'>
                        <button className='font-semibold' onClick={handleOpenUploadPhoto}>Change Photo</button>
                        <input
                            type='file'
                            id='profile_pic'
                            className='hidden'
                            onChange={handleUploadPhoto}
                            ref={uploadPhotoRef}
                        />
                        </label>
                    </div>
                </div>

                <Divider/>    
                <div className='buttom '>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit} >Save</button>
                </div>
            </form>
            
        </div>
    
  )
}

export default React.memo(EditUserDetails)
