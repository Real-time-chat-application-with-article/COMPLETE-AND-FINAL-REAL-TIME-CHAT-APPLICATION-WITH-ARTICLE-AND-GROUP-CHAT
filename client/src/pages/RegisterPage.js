import React, { useState, CSSProperties , useEffect} from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import './registerPage.css'
import toast from 'react-hot-toast';
import logo from "../images/logo1.png"
import Loader from "react-spinners/HashLoader";

//SETTING THE PROPERTIES OF OUR LOAD SPINNER
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  position: "absolute",
  width:"100vw",
  height:"100vh",
  transform: "rotate(0deg)",
  background:"transparent",
  zIndex:"100000",
  backdropFilter: "blur(200px)",
  top: "0",
  left: "0",
  right:"0",
  bottom: "0",
  borderColor: "red",
};

const RegisterPage = () => {

  //CAPTUNRING USER INPUT AND STORING IT IN THHIS OBJECT
  const [data,setData] = useState({
    name : "",
    email : "",
    password : "",
    profile_pic : ""
  })
  //******************************************************************************* */

  const [uploadPhoto,setUploadPhoto] = useState("")
  const navigate = useNavigate()
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  //********************************************************************************* */
  //THIS FUNCTION RECEIVES USER IMAGE AND UPLOAD IT TO CLOUDINARY, WHERE IT IS STORED 
  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]
    const uploadPhoto = await uploadFile(file)
    setUploadPhoto(file)
    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })
  }
//******************************************************************************************* */
  //THIS FUNCTION IS IN CHANGE OF DELETING THE USER UPLOADING PHOTO
  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }
//************************************************************************************************ */

  const [errorDisplay, setErrorDisplay] = useState("")
  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `http://192.168.156.157:8080/api/register`

    try {
        const response = await axios.post(URL,data)
     
        if(response.data.success){
            setData({
              name : "",
              email : "",
              password : "",
              profile_pic : ""
            })

            navigate('/email')

        }
    } catch (error) {

      setErrorDisplay(error?.response?.data?.message)
      setTimeout(() => {
        setErrorDisplay("")
      }, 4000);

    }
  
  }
//========================================================================================
//SETTING UP THE LOADER  
const [loading, setLoading] = useState(true);
const [opacity, setOpacity] = useState(true);
  useEffect(() => {
    setLoading(true)
    setOpacity(true)
    setTimeout(() => {       
        setTimeout(() => {
           setLoading(false)
        }, 5000);
        setOpacity(false)
    }, 5000);
  }, []) 


//============================================================================================
 //THIS FUNCTION IS USED TO TOOGLE THE TYPE OF THE PASSWORD TO MAKE IT HIDDEN OR VISBLE================
 const [inputType, setInputType] = useState('password');
 const [addMode, setAddMode] = useState(true)
 //***************************************************************************************** */
 const clickToggle = () =>{     
  if (!addMode) {
     setInputType('password')
  }
  else{
         setInputType('text')
  }  
  setAddMode(!addMode);
}
//***************************************************************************************** */
//=====================================================================================

  return (
    <div className='RegisterPage'>

       <Loader
          color={"purple"}
          loading={loading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
       

           <div className={`container text-side ${opacity ? "fade-out" : undefined}`}>
           <div className='logo-side'>
                <img src={logo}/>
            </div>
            <h2>WELCOME DEAR DISTINCT USER</h2>
              <span>
                    There are alot of people who can't wait to get in touch with you, some of which could be your friends
                    familly, relatives or love ones,  you could even make new friends. All are waiting for you
                  <br/>Sign up now if itsyour first time 
              </span> 
              <span>
                 OR
                <br/>
                   <b><Link to='/email' style={{color: 'white'}} >Sign In</Link></b> if you are already part of us
                   
              </span>
             
           </div> 

        <div className={`container form ${opacity ? "fade-out" : undefined}`}>
             <div className='head'>
                    <h3>SIGN UP</h3>   
                </div>
          {
            errorDisplay ? <div className='error'>{errorDisplay}</div> : undefined

          }
          
          <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>

              <div className='input-Box'>
                 <input
                  type='text'
                  id='name'
                  name='name'
                   value={data.name}
                  onChange={handleOnChange}                  
                />
                 <label htmlFor='email'>Full Name</label>
                <ion-icon name="person"></ion-icon>
              </div>


              <div className='input-Box'>
               
                <input
                  type='text'
                  id='email'
                  name='email'
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.email}
                  onChange={handleOnChange}                
                />
                 <label htmlFor='email'>Email Address</label>
                 <ion-icon name="mail"></ion-icon>
              </div>

              <div className='input-Box'>
                   <input
                  type={inputType}
                  id='password'
                  name='password'
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.password}
                  onChange={handleOnChange}                  
                />
                  <label htmlFor='password'>Password</label>
                  <ion-icon className="passwordIcon" onClick={clickToggle}  name={addMode ? "eye-off-sharp" : "eye-sharp"}></ion-icon>
             
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='profile_pic'>

                  <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                        }
                      </p>
                      {
                        uploadPhoto?.name && (
                          <button className='text-lg ml-2 hover:text-red-600 close-btn' onClick={handleClearUploadPhoto}>
                            <IoClose/>
                          </button>
                        )
                      }
                      
                  </div>
                
                </label>
                
                <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                  onChange={handleUploadPhoto}
                />
              </div>


              <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                Sign Up
              </button>

             

          </form>

            </div>

       
       
    </div>
  )
}

export default RegisterPage
