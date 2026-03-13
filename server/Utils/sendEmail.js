const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async (to, subject, text) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls:{
        rejectUnauthorized: false
      }
    })

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    }

    await transporter.sendMail(mailOptions)

    return true

  } catch (err) {
    console.log("Email error:", err.message)
    return false
  }
}

module.exports = sendEmail