
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./Config/DB')
const authRoutes = require('./Routes/authRoute')

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/auth",authRoutes)

const startServer = async ()=>{
    try{
        await connectDB()
        app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`))
    }catch(err){
        console.log(err.message)
    }
}

startServer()