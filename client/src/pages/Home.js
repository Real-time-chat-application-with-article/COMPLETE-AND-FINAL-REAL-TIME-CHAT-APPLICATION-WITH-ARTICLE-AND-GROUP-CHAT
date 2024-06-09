import axios from 'axios'
import React, { useEffect, useCallback , CSSProperties, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../images/logo1.png'
import io from 'socket.io-client'
import  "./home.css"
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
  backdropFilter: "blur(5px)",
  top: "0",
  left: "0",
  right:"0",
  bottom: "0",
  borderColor: "red",
};


const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location?.state?.name)

  const fetchUserDetails = useCallback(async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
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
    } catch (error) {
      console.log("error", error)
    }
  }, [dispatch, navigate])

  useEffect(() => {
    fetchUserDetails()
  }, [fetchUserDetails])

  /***socket connection */
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      },
    })

    socketConnection.on('onlineUser', (data) => {
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }
  }, [dispatch])

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

  const basePath = location.pathname === '/'
  return (
    <div className='grid lg:grid-cols-[300px,1.5fr] h-screen max-h-screen Home'>
      <Loader
          color={"purple"}
          loading={loading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      <section className={`sidebar  ${!basePath && "hidden"} lg:block ${opacity ?  "disactive" : undefined }`}>
        <Sidebar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"} transp`}>
        <Outlet />
      </section>

      <div className={`messageArea justify-center  items-center flex-col gap-2  ${!basePath ? "hiddens" : "lg:flex"}  ${opacity ?  "disactive" : undefined }`}>
        <div>
          <img
            src={logo}
            width={250}
            alt='logo'
          />
        </div>
        <p className=''>Select user to send message</p>
      </div>
    </div>
  )
}

export default Home
