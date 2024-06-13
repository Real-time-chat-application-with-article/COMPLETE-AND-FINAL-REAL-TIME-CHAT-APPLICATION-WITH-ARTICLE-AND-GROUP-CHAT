import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../fbconfig/fbase';
import {v4} from 'uuid'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useCallback , CSSProperties, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation,  useParams, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'

const EditArticles = () => {

const {id}=useParams()
const [title1, setTitle1] = useState('');
const [description1, setDescription1] = useState('');
const [imgUrl, setImgUrl] = useState('');
const [addedBy, setAddedBy] = useState('');
const [imgDb,setImgDb]=useState('')
const [art,setArt]=useState({})
const filesFolderRef=ref(storage,`projectFiles/${imgUrl.name+v4()}`);
const catDoc=doc(db,'articles',id)
useEffect(()=>{
    
const getArticleById = async () => {
    const articleRef = doc(db, 'articles', id);
    const articleSnapshot = await getDoc(articleRef);
  
    if (articleSnapshot.exists()) {
      const articleData = articleSnapshot.data();
      console.log('Article data:', articleData);
      setArt(articleData)
      setTitle1(articleData.Post_description)
      setDescription1(articleData.Post_description)
    } else {
      console.log('Document does not exist.');
    }
  };
  
  // Usage:
  getArticleById();
},[])

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


const updateCategory=async(e)=>{
    e.preventDefault()
const filesFolderRef=ref(storage,`projectFiles/${imgUrl.name+v4()}`);
const catDoc=doc(db,'articles',id)
const now = new Date();
const formattedDateTime = now.toLocaleString(); 
if(!imgUrl){
    const now = new Date();
    const formattedDateTime = now.toLocaleString(); 
    await updateDoc(catDoc,{
        postBy:username,
        profile_pic: profile_pic,
        createdate:formattedDateTime,
        Post_description:description1,
        Post_title:title1
    })
    navigate('/articles')
    console.log("sucessfull")
}else{
   
    await uploadBytes(filesFolderRef,imgUrl)
    const downloadUrl= await getDownloadURL(filesFolderRef)
    await updateDoc(catDoc,{
        postBy:username,
        profile_pic: profile_pic,
        createdate:formattedDateTime,
        Post_description:description1,
        Post_image:downloadUrl,
        Post_title:title1
         
})
navigate('/articles')

console.log("sucessfull")
}

}



    
      

    
    return (
        <div className='Add-Article'>
           
        <div className='content'>
            <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                Publish An Article
            </h1>

            <form >
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
                        onClick={updateCategory}
                    >
                        Publish
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default EditArticles;
