const nodemailer = require('nodemailer') //libreria nos permite automatizar el enviode emails
const { google } = require("googleapis")//nos permiten usar gmail como medio de envio
const OAuth2 = google.auth.OAuth2//importa de las googleapis un metodo de autorizacion


const sendEmail = async (email, string) => { //depende del mail que ingresa el usuario y el uniqueString que se crea con crypto

    const myOAuth2Client = new OAuth2( //pide la autorizacion de OAuth2 que requiere los siguientes parametros
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )


    myOAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESHTOKEN
    })

    const accessToken = await myOAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({//transporter(metodo de nodemeiler) es el que entrega el mail
        service: "gmail",
        auth: {
            type: "OAuth2",//autorizacion especifica de google
            user: process.env.USER,
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {//sirve para evitar que bloquee el antivirus
            rejectUnauthorized: false //para evitar que bloquee el antivirus
        }
    })


    let mailOptions = {//es lo que voy a enviar
        from: process.env.USER,
        to: email,
        subject: 'verify account',//asunto, cuando aceptas la verificcion te manda al controlador y cuando el verification pase a true, recien ahi te manda a la pagina
        html: `
            <a href=http://localhost:4000/api/verify/${string}>CLICK!</a>
            <h3>to confirm!</h3>`
    }//html es lo que va dentro del mail//el unique string 

    await transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error)
        } else {
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = sendEmail