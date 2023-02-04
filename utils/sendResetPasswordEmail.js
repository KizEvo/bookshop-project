import { sendGridEmail } from './sendEmail.js'

const sendResetPasswordEmail = async ({
  name,
  email,
  passwordToken,
  origin,
}) => {
  const resetPassword = `${origin}/user/reset-password?token=${passwordToken}&email=${email}`

  const message = `
  <p>Someone just request to change your password. If this is you please confirm by clicking the following link:
     <a href='${resetPassword}'>
       Reset Password
     </a>
  </p>
    <p>If you didn't request this action, you can safely ignore it! Have a nice day
  </p>
  `
  return sendGridEmail({
    to: email,
    subject: 'Reset Password Confirmation',
    html: `<h4>Hello ${name},</h4>
    ${message}`,
  })
}

export default sendResetPasswordEmail
