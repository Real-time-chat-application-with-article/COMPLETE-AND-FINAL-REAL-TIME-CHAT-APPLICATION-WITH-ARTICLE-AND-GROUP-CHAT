const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')
const axios = require("axios");

// const app = express()
app.use(cors({
    origin : "http://192.168.156.157:3000",
    credentials : true
}))
app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(request,response)=>{
    response.json({
        message : "Server running at " + PORT
    })
})

app.post("/groupsignup", async (request, response) => {
    const { username, email , password, profile_pic } = request.body

    try {
      const r =   await axios.post(
    "https://api.chatengine.io/users/",
    {
        username: username,
        secret: password,
        first_name: username,
        avatar: profile_pic,
        email: email
    },
    {
        headers: { "Private-Key": "81e1b97f-a237-4142-b731-184e62c29769" } 
    }
   
      );
      return response.status(r.status).json(r.data);
    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            failure: "jesysys"
        })
    }
  });
  


//api endpoints
app.use('/api',router)

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server running at " + PORT)
    })
})
