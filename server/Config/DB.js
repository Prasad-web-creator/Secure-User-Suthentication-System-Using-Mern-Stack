
const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected on ${conn.connection.host}`)
    }catch(err){
        console.log(err.message)
    }
}

module.exports = connectDB