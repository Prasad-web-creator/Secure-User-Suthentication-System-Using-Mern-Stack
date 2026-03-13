const { Resend } = require('resend')
require('dotenv').config()

const sendEmail = async (to, subject, text) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Resend's default testing domain. In prod, they should verify their domain.
      to: [to],
      subject: subject,
      html: `<p>${text}</p>`, // Resend handles text/html better.
    });

    if (error) {
      console.log("Resend Email error:", error.message)
      return false
    }

    return true

  } catch (err) {
    console.log("Email catch error:", err.message)
    return false
  }
}

module.exports = sendEmail