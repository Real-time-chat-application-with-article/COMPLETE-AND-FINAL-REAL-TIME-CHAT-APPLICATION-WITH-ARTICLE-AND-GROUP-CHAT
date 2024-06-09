import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { db, storage } from '../fbconfig/fbase';
import {v4} from 'uuid'
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddArticles = () => {
const navigate=useNavigate()

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
        addedby:"Deschanel",
        createdat:formattedDateTime,
        description:description1,
        image:downloadUrlMainImg,
        title:title1
        
     })
  
     console.log('article data stored successfully, thank you')
     navigate('/articles')
     }catch(err){
       
         console.log(err.message)
        
     }
 }

 const [title1, setTitle1] = useState('');
  const [description1, setDescription1] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [addedBy, setAddedBy] = useState('');
const [imgDb,setImgDb]=useState('')
    
      

    
    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Add Article
                </h1>
{imgDb}
                <form onSubmit={addArticles}>
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
                        >
                            Add Article
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddArticles;
