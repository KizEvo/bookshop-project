import dotenv from 'dotenv'
dotenv.config()

export default {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
  },
}
