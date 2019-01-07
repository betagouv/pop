const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "97961720122-d76chdhvqt7k2hujvd6qmnag0pk2ckl7.apps.googleusercontent.com", // ClientID
  "4pxb2Kfa_oacKdQ8kr6NOlHc", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

class Mailer {
  async send(subject, to, html) {

    oauth2Client.setCredentials({
      refresh_token: "1/P5giffbw_VsczcKdLxmm5Lip-HeQkr-OKyamwYtKMkpzzx79UvRDHlibGpoREDC0"
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
          clientId: "97961720122-d76chdhvqt7k2hujvd6qmnag0pk2ckl7.apps.googleusercontent.com",
          clientSecret: "4pxb2Kfa_oacKdQ8kr6NOlHc",
          refreshToken: "1/P5giffbw_VsczcKdLxmm5Lip-HeQkr-OKyamwYtKMkpzzx79UvRDHlibGpoREDC0",
          accessToken: accessToken
     }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Support POP" <sebastien.legoff@beta.gouv.fr>', // sender address
      to, // list of receivers
      subject, // Subject line
      text: "Impossible de lire l'email", // plain text body
      html // html body
    };
    
    // send mail with defined transport object
    try {
      return transporter.sendMail(mailOptions);
    } catch (error) {
      return console.log(error)
    }
  }
}

const n = new Mailer();
module.exports = n;
