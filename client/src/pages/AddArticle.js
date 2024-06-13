import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../fbconfig/fbase';
import {v4} from 'uuid'
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useCallback , CSSProperties, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'


const AddArticles = () => {
const navigate=useNavigate()
const dispatch = useDispatch()
const [username, setUserNmae] = useState("")
const [profile_pic, setprofile_pic] = useState("")

const fetchUserDetails = useCallback(async () => {
    try {
      const URL = `http://192.168.156.157:8080/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true
      })

     
      dispatch(setUser(response.data.data))

      if (response.data.data.logout) {
        dispatch(logout())
        navigate("/email")
      }
      console.log("current user Details", response)
      setUserNmae(response.data.data.name)
      setprofile_pic(response.data.data.profile_pic)
    } catch (error) {
      console.log("error", error)
    }
  }, [dispatch, navigate])
  
  useEffect(() => {
    fetchUserDetails()
  }, [fetchUserDetails])

    const addArticles=async(e)=>{
      e.preventDefault()
         // const timestamp=firebase.FieldValue.severTimestamp();
         // console.log(timestamp) 
         const articleCollectionRef=collection(db,'articles');

     if(!imgUrl) return;
     const filesFolderRef=ref(storage,`projectFiles/${imgUrl.name+v4()}`);
     try{
        
       
     await uploadBytes(filesFolderRef,imgUrl)
         const downloadUrlMainImg= await getDownloadURL(filesFolderRef)
         const now = new Date();
         const formattedDateTime = now.toLocaleString(); 
 await addDoc(articleCollectionRef,{
        postBy:username,
        profile_pic: profile_pic,
        createdate:formattedDateTime,
        Post_description:description1,
        Post_image:downloadUrlMainImg,
        Post_title:title1
        
     })
     alert("Successfully posted")
   navigate('/articles')

     }catch(err){
       
         console.log(err.message)
        alert(err.message)
     }
 }

 const [title1, setTitle1] = useState('');
  const [description1, setDescription1] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [addedBy, setAddedBy] = useState('');
const [imgDb,setImgDb]=useState('')
    
      

    
    return (
        <div className='Add-Article'>
           
            <div className='content'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Publish An Article
                </h1>

                <form onSubmit={addArticles}>
                    <div>
                        <input
                        name='title'
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='title'
                            placeholder='Your Title Here'
                            onChange={(e)=>setTitle1(e.target.value)}
                        />
                    </div>

                    <div style={{width:"100%" }}>
                        <label className='post-img' htmlFor='pass'>
                        <ion-icon  name="image-outline"></ion-icon>
                            Add Image</label>
                        <input
                        onChange={(e)=>setImgUrl(e.target.files[0])}
                            type='file'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='pass'
                            name='img'
                            placeholder='choose an image'
                        />
                    </div>
                    <div>
                        <textarea
                        onChange={(e)=>setDescription1(e.target.value)}
                        name='desc'
                            type='text'
                            id='password'
                            placeholder='Start writing here'
                        />
                    </div>
                  
                      <div style={{width:"100%"}}>
                      
                        <button type='submit' style={{width:"100%", color:"white",transition:"0.3s linear", background:"purple",padding:"20px 15px"}}
                            className="button" 
                        >
                            Publish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddArticles;
