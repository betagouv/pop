const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID, // ClientID
  process.env.GMAIL_CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

class Mailer {
  async send(subject, to, html) {
    try {
      // const authUrl = oauth2Client.generateAuthUrl({
      //   access_type: "offline",
      //   scope: ["https://www.googleapis.com/auth/gmail.compose"]
      // });
      // console.log("Authorize this app by visiting this url:", authUrl);
      // return;

      oauth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN
      });
      const authHeaders = await oauth2Client.getRequestHeaders();
      const accessToken = authHeaders.Authorization;

      // console.log (subject, to, html)
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      // create reusable transporter object using the default SMTP transport

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "popbetagouv@gmail.com",
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: accessToken
        }
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Support POP" <pop@culture.gouv.fr>', // sender address
        to, // list of receivers
        subject, // Subject line
        text: html, // plain text body
        html // html body
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
