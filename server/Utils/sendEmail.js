

const nodemailer = require('nodemailer')

const sendEmail = async (to,subject,text)=>{

    try{
        const transporter = await nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:465,
            secure:true,
            auth:{
                user:process.env.EMAIL_ADMIN,
                pass : process.env.EMAIL_PASSWORD
            },
            tls:{
                rejectUnauthorized:false
            }
        })

        const mail = {
            from : process.env.EMAIL_ADMIN,
            to:to,
            subject:subject,
            text:text
        }

        const information = await transporter.sendMail(mail)

    }catch(err){
        console.log(err.message)
    }
}

module.exports = sendEmail