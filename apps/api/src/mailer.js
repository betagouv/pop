const nodemailer = require("nodemailer");

class Mailer {
  async send(subject, to, html) {
    try {
      // console.log (subject, to, html)
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      // create reusable transporter object using the default SMTP transport

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_LOGIN,
          pass: process.env.SMTP_PASSWORD
        }
      })

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Support POP" <pop@culture.gouv.fr>', // sender address
        to, // list of receivers
        cc: "pop@culture.gouv.fr", // Copy to adress MCC
        subject, // Subject line
        text: html, // plain text body
        html // html body,
      };

      // send mail with defined transport object

      return transporter.sendMail(mailOptions);
    } catch (error) {
      return console.log(error);
    }
  }
}

const n = new Mailer();
module.exports = n;
