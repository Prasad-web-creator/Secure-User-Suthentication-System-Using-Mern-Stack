const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls:{
          rejectUnauthorized:false
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: `<p>${text}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
    return true;

  } catch (err) {
    console.log("Nodemailer error:", err.message);
    return false;
  }
}

module.exports = sendEmail