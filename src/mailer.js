const nodemailer = require('nodemailer')

class Mailer {
  send (subject, to, html) {

    console.log (subject, to, html)
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'popbetagouv@gmail.com',
        pass: 'poppippup!'
      }
    })

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Support POP" <sebastien.legoff@beta.gouv.fr>', // sender address
      to, // list of receivers
      subject, // Subject line
      text: 'Impossible de lire l\'email', // plain text body
      html// html body
    }

    // send mail with defined transport object
    return transporter.sendMail(mailOptions)
  }
}

const n = new Mailer()
module.exports = n
