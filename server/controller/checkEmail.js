const UserModel = require("../models/UserModel")
const validator = require('validator')
async function checkEmail(request,response){
    try {
        const { email } = request.body

        if(!email){
            return response.status(400).json({
                message : "Email address is empty",
                error : true,
            })
         }
         if(!validator.isEmail(email)){
            return response.status(400).json({
                message : "Invalid Email Address",
                error : true,
            })
         }

        const checkEmail = await UserModel.findOne({email}).select("-password")

        if(!checkEmail){
            return response.status(400).json({
                message : "Sorry, User not found, try again",
                error : true
            })
        }

        return response.status(200).json({
            message : "It really you",
            success : true,
            data : checkEmail
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = checkEmail