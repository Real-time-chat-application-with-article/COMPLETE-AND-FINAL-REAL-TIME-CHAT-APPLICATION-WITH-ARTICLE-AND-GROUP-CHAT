require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());

async function GroupAcessing(request,response){
    try {
        const { name, email , password, profile_pic } = request.body

   const responsefromSite   = await axios.post(
    "https://api.chatengine.io/users/",
    {
        username: name,
        secret: password,
        first_name: name,
        avatar: profile_pic,
        email: email
    },
    {
        headers: { "Private-Key": "81e1b97f-a237-4142-b731-184e62c29769"} 
    }
   )
   return response.status(responsefromSite.status).json({
    message : "successfully",
    data : responsefromSite.data,
    successs : true
   }) 
      

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = GroupAcessing