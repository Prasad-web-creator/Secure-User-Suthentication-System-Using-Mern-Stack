
const UserModel = require('../Models/UserModel')
const express = require('express')
const {register,login,getOtp,newPassword,resetPassword,otpVerify} = require('../Controllers/UserController')
const authMiddleware = require('../Middlewares/authMiddleware')


const router = express.Router()

router.get('/profile',authMiddleware,async (req,res)=>{
    try{
        const user = await UserModel.findById(req.user._id).select('-password')
        return res.status(201).json(user)
    }catch(err){
        return res.status(401).json({message:err.message})
    }
})

router.post('/register',register)
router.post('/login',login)
router.post('/getotp',getOtp)
router.post('/newpassword',newPassword)
router.post('/resetpassword',resetPassword)
router.post('/otpverify',otpVerify)

module.exports = router