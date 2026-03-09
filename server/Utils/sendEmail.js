const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:465,
      secure:true,
      family: 4,
      auth:{
        user:process.env.EMAIL_ADMIN,
        pass : process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const info = await transporter.sendMail({
      from : process.env.EMAIL_ADMIN,
      to:to,
      subject:subject,
      text:text
    })


  } catch (err) {
    console.log("Email error:", err.message)
  }
}

module.exports = sendEmail