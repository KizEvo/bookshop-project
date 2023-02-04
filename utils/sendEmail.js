import nodemailer from 'nodemailer'
import nodemailerConfig from './nodemailerConfig.js'
import sgMail from '@sendgrid/mail'

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport(nodemailerConfig)

  return transporter.sendMail({
    from: '"BookShop" <bookshop21200328@gmail.com>', // sender address
    to,
    subject,
    html,
  })
}

const sendGridEmail = async ({ to, subject, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to, // Change to your recipient
    from: 'bookshopbspsg@gmail.com', // Change to your verified sender
    subject,
    html,
  }

  return sgMail.send(msg)
}

export { sendGridEmail, sendEmail }
