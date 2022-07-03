const nodemailer = require('nodemailer')
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2


const sendEmail = async (email, string) => { //depende del mail que ingresa el usuario y el uniqueString que se crea con crypto

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )
    console.log("la constatente myOAuth2Client")
    console.log(myOAuth2Client)

    myOAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESHTOKEN
    })

    const accessToken = await myOAuth2Client.getAccessToken()
    console.log("console de accessToken")
console.log(accessToken)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.USER,
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false //para evitar que bloquee el antivirus
        }
    })
    console.log("console de transporter")
    console.log(transporter)

    let mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'verify account',
        html: `
            <a href=http://localhost:4000/api/verify/${string}>CLICK!</a>
            <h3>to confirm!</h3>`
    }

    await transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error)
        } else {
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = sendEmail