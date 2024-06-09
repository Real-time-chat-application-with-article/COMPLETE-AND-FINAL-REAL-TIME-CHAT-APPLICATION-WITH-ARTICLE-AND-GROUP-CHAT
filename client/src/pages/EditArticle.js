import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../fbconfig/fbase';
import {v4} from 'uuid'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
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
      setTitle1(articleData.title)
      setDescription1(articleData.description)
    } else {
      console.log('Document does not exist.');
    }
  };
  
  // Usage:
  getArticleById();
},[])

const navigate=useNavigate()
const updateCategory=async()=>{
    
const filesFolderRef=ref(storage,`projectFiles/${imgUrl.name+v4()}`);
const catDoc=doc(db,'articles',id)
const now = new Date();
const formattedDateTime = now.toLocaleString(); 
if(!imgUrl){
    const now = new Date();
    const formattedDateTime = now.toLocaleString(); 
    await updateDoc(catDoc,{
        addedby:"Deschanel",
        createdat:formattedDateTime,
        description:description1,
        title:title1
    })
    navigate('/articles')
    console.log("sucessfull")
}else{
   
    await uploadBytes(filesFolderRef,imgUrl)
    const downloadUrl= await getDownloadURL(filesFolderRef)
    await updateDoc(catDoc,{
        addedby:"Deschanel",
        createdat:formattedDateTime,
        description:description1,
        title:title1,
        image:downloadUrl
    
})
navigate('/articles')

console.log("sucessfull")
}

}



    
      

    
    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-black mt-4 mb-12 text-center'>
                  Edit Article
                </h1>
{id}
                <form onSubmit={(e)=>e.preventDefault()}>
                    <div>
                        <label htmlFor='email'>Title</label>
                        <input
                        name='title'
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'

                            onChange={(e)=>setTitle1(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Description</label>
                        <textarea
                        
                        onChange={(e)=>setDescription1(e.target.value)}
                        name='desc'
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='enter description'
                        />
                    </div>
                    <div>
                        <label htmlFor='pass'>image</label>
                        <input
                        onChange={(e)=>setImgUrl(e.target.files[0])}
                            type='file'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='pass'
                            name='img'
                            placeholder='choose an image'
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                      
                        <button
                            className="bg-green-500 p-2 text-white rounded" 
                            onClick={updateCategory}
                        >
                           Update Article
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArticles;
