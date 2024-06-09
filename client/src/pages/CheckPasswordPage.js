import React, { useEffect, useState, CSSProperties } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import Loader from "react-spinners/HashLoader";
import logo from "../images/logo1.png"
import { useDispatch } from 'react-redux';
import './checking.css'
import { setToken, setUser } from '../redux/userSlice';

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

const CheckPasswordPage = () => {

  const [errorDisplay, setErrorDisplay] = useState("") //FOR STORING ERROR IN CHECKING EMAIL
  const [loading, setLoading] = useState(true);   //RESPONSIBLE FOR ACTIVATING AND DISACTIVATING THE LOADER
  const [opacity, setOpacity] = useState(true);   
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [data,setData] = useState({
    password : "",
    userId : ""
  })

  useEffect(()=>{
    if(!location?.state?.name){
      navigate('/email')
    }
  },[])
  console.log(location?.state?.name)

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

    try {
        const response = await axios({
          method :'post',
          url : URL,
          data : {
            userId : location?.state?._id,
            password : data.password
          },
          withCredentials : true
        })

         if(response.data.success){
            dispatch(setToken(response?.data?.token))
            localStorage.setItem('token',response?.data?.token)

            setData({
              password : "",
            })
            navigate('/')
        }
    } catch (error) {
      setErrorDisplay(error?.response?.data?.message)
      setTimeout(() => {
        setErrorDisplay("")
      }, 4000);
    }
  }

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
           <div className='welcome'>
               <img src={location?.state?.profile_pic} />
               <h1> WECOME BACK TO US <br/>{location?.state?.name}</h1>
           </div>
           <span>
                 At this point you are set to join us once again, all what is required now is just for your 
                 to input your password to continue the communication you once had before
              </span>
                         
          </div> 


        <div className={`container form ${opacity ? "fade-out" : undefined}`}>

            <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
            
            {
            errorDisplay ? <div className='error'>{errorDisplay}</div> 
            : <div className='head'>
            <h3>LOGIN</h3>   
              </div>

            }
          
           </div>

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
              

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
                        <span><Link>Forgot your password?</Link></span> 
              <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                Login
              </button>

          </form>

          </div>

    </div>
  )
}

export default CheckPasswordPage

