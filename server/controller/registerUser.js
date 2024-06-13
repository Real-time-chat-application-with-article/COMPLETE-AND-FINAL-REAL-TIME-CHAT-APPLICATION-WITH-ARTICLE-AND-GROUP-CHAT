const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')
const validator = require('validator')

async function registerUser(request,response){
    try {
        const { name, email , password, profile_pic } = request.body

        if(!name || !email || !password || !profile_pic){
            return response.status(400).json({
                message : "All Information are required",
                error : true,
            })
         }
         if(!validator.isEmail(email)){
            return response.status(400).json({
                message : "Invalid Email Address",
                error : true,
            })
         }
         
         if ( !validator.isStrongPassword(password)) {
            return response.status(400).json({
                message : "Sorry, your password must be strong",
                error : true,
            })
         }

        const checkEmail = await UserModel.findOne({ email }) //{ name,email}  // null

        if(checkEmail){
            return response.status(400).json({
                message : "Already user exits",
                error : true,
            })
        }

        //password into hashpassword
        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            profile_pic,
            password : hashpassword
        }

        const user = new UserModel(payload)
        const userSave = await user.save()

        

        return response.status(201).json({
            message : "User created successfully",
            data : userSave,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = registerUser