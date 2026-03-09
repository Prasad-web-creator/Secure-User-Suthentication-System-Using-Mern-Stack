
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/UserModel')
const bcrypt = require('bcryptjs')
const sentEmail = require('../Utils/sendEmail')

let otp_store = {}
let reset_store = {}

exports.register = async(req,res)=>{
    try{
        const {username,email,password,otp} = req.body

        if(!username || !email || !password){
            return res.status(401).json({message:"All fields are required"})
        }

        const user = await UserModel.findOne({email})

        if(user){
            return res.status(401).json({message:"Email already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const matchOTP =  otp_match(otp_store[email],otp)


        if(!matchOTP){
            return res.status(401).json({message:"Invalid Otp"})
        }

        await UserModel.create({
            username,
            email,
            password:hashPassword
        })

        return res.status(201).json({message:"User Registeration Successful"})
    }catch(err){
        return res.status(500).json({message:"Server Connection Failed"})
    }
}

function genOtp(){
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp
}


function otp_match(otp,user_otp){
    if(otp==user_otp){
        return true
    }
    return false
}

exports.getOtp = (req,res)=>{

    const {email} = req.body
    const gen_otp = genOtp()

    if(!email){
        return res.status(201).json({message:"All fields are required"})
    }

    try{

        otp_store[email] = gen_otp
        
        sentEmail(email,
            "Otp for your registration in mern-auth",
            `Your 6 digit OTP is ${gen_otp}`
        )


        return res.status(201).json({message:"Otp is sent to your email"})

    }catch(err){
        return res.status(500).json({message:"Server Connection Failed"})
    }
}

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(401).json({message:"All fields are required"})
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(401).json({message:"User not Found"})
        }

        const matchPassword = await bcrypt.compare(password,user.password)

        if(!matchPassword){
            return res.status(401).json({message:"Invalid Password"})
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        return res.status(201).json({
            token,
            user:{
                username : user.username,
                email : user.email
            },
            message:"Login Successful"
        })

    }catch(err){
        return res.status(500).json({message:"Server Connection Failed"})
    }
}


exports.resetPassword = async (req,res)=>{
    try{
        const {email} = req.body

        if(!email){
            return res.status(400).json({message:"All fields are required"})
        }

        const reset_otp = genOtp()

        reset_store[email] = reset_otp

        const state = await sentEmail(email,
            "Reset password OTP for Mern-Auth",
            `Your OTP for reset password ${reset_otp}`
        )

        if(state) return res.status(201).json({message:"Reset password otp is sent to your email"})
        else return res.status(201).json({message:"Failed to send OTP"})

    }catch(err){
        return res.status(500).json({message:"Server Connection Failed"})
    }
}

exports.newPassword = async(req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(401).json({message:"All fields are required"})
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(401).json({message:"User not Exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        await UserModel.findOneAndUpdate({email},{password:hashPassword})
        
        return res.status(401).json({message:"Password Changed Successfully"})
    }catch(err){
        return res.status(500).json({message:"Server Connection Failed"})
    }
}

exports.otpVerify = (req,res)=>{
    try{
        const {email,otp} = req.body

        if(!email || !otp){
            return res.status(401).json({message:"All fields are required"})
        }

        const matchOTP =  otp_match(reset_store[email],otp)

        if(!matchOTP){
            return res.status(401).json({message:"Invalid Otp"})
        }

        return res.status(401).json({message:"Otp verified"})

    }catch(err){
        return res.status(500).json({message:"Server Connection Failed"})
    }
}