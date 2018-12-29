import nodemailer from 'nodemailer'

const sendValidationEmail = ({ name, email }, token) => {
  const html = `
  <h1>Welcome</h1>
  <h2>Please confirm your email address by clicking the link bellow:</h2>
  <p>Not a link (yet): ${token}</p>
  `

  console.log(process.env.SEND_EMAIL)

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"GraphQl App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Welcome ${name}!`,
    text: '',
    html
  } // sender address // list of receivers // Subject line // plain text body // html body

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error('The email has not been sent!')
    }
    console.log(`Email sent to ${mailOptions.to}`)
  })
}

export { sendValidationEmail as default }
