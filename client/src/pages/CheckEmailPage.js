import React, { useState, useEffect, CSSProperties } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import "./checking.css"
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
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

const CheckEmailPage = () => {

  //SETTINF UP ALL OUR REQUIIRED STATE
  const navigate = useNavigate()         //FOR NAVIGATION TO OTHER PAGES
  const [errorDisplay, setErrorDisplay] = useState("") //FOR STORING ERROR IN CHECKING EMAIL
  const [loading, setLoading] = useState(true);   //RESPONSIBLE FOR ACTIVATING AND DISACTIVATING THE LOADER
  const [opacity, setOpacity] = useState(true);     //FOR HIDING THE EMAIL PAGE FOR SOME TIMES
  const [data,setData] = useState({
    email : "",                            //THIS STATE IS FOR HOLDING USER EMAIL ADDRESS
  })
  
//THIS FUNCTION IS ACTIVE EACH TIME THE USER TYPES IN THE INPUT FIELD
//RESPOSNDIBLE FOR SENDING THE VALUE TO THE DATA SET
  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }


  //THIS IS THE MAIN FUNCTION RESPONSIBLE FOR CHECKING OUR USER EMAIL TO VERIFY THEM
  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`  //GENEARTING OUR BACKEND URL

    try {
        const response = await axios.post(URL,data)  //COMMUNICATES WITH OUR BACKEND THROUGHT THIS URL
       
        if(response.data.success){
            setData({
              email : "",
            })
            localStorage.setItem("UserEmail", JSON.stringify(response?.data?.data.email))
            navigate('/password',{
              state : response?.data?.data
            })
        }

    } catch (error) {

      setErrorDisplay(error?.response?.data?.message)
      setTimeout(() => {
        setErrorDisplay("")
      }, 4000);

    }
  }

  //THIS IS THE AREA WHERE WE SET UP OUR  PAGE LOADER
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

  const GoogleSignIn = () =>{
      window.open("http://localhost:4000/auth/google/callback", "_self")
  }

  return (
    <div className='checking'>
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
           
           <h2>HELLO DEAR DISTINCT USER</h2>
           <span>
                 We see that you are trying to login to your account, To do this kindly fill in your email address
                so we can identity you
              </span>
             <span>
                OR
               <br/>
                  <b><Link to='/register' style={{color: 'white'}} >Sign up</Link></b> if you already are a memeber
                  
             </span>
            
          </div> 

          <div className={`container form ${opacity ? "fade-out" : undefined}`}>

        <div className='head'>
                    <h3>VERIFY EMAIL ADDRESS</h3>   
        </div>
        

        {
            errorDisplay ? <div className='error'>{errorDisplay}</div> 
            : <div className='msg'>This is just the first part of the sign in process</div>

          }
                  

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>              

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
                            <span><Link>Forgot Email Address?</Link></span>
              <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
               Sign in
              </button>

          </form>
          </div>
    </div>
  )
}

export default CheckEmailPage
