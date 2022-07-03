const User = require('../models/signUsers')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendEmail = require('./sendEmail')
const jwt = require ('jsonwebtoken')

const usersControllers ={
    signUpUsers: async (req, res) => {
        let { firstName, lastName, email, password, from, country, imgProfile } = req.body.userData
        // console.log(req.body.userData)
        // const test = req.body.test
        try {
            const userExist = await User.findOne({ email })
            const verification = false //por default
            const uniqueString = crypto.randomBytes(15).toString('hex') //utilizo los metodos crypto
            // console.log(uniqueString)
            if (userExist) { // si existe el usuario
                if (userExist.from.indexOf(from) !== -1) {
                    res.json({
                        success: false,
                        from: from,
                        message: "Ya has realizado tu SingUp de esta forma por favor realiza SignIn"
                    })
                } else {
                    const passwordHasheada = bcryptjs.hashSync(password, 10)
                    userExist.verification = true
                    userExist.from.push(from)
                    userExist.password.push(passwordHasheada)
                    res.json({
                        success: true,
                        from: from,
                        message: "Agregamos " + from + " a tus medios para realizar signIn"
                    })
                }
            } else { //si no existe el usuario
                const passwordHasheada = bcryptjs.hashSync(password, 10)
                // console.log(req.body.userData)
                const newUser = await new User({
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    verification:verification,
                    uniqueString:uniqueString,
                    password:[passwordHasheada],
                    from:[from],
                    country:country,
                    imgProfile:imgProfile
                })
                console.log(newUser)
                if (from !== "form-signup") { // si el from es distinto a signup, significa que se registro su cuenta por una red social
                    // newUser.verification = true
                    await newUser.save()
                    res.json({
                        success: true,
                        from: from,
                        message: "Felicitaciones se ha creado tu usuario con " + from
                    })
                } else {
                    await newUser.save() 
                    console.log(newUser)
                    await sendEmail(email, uniqueString)
                    res.json({
                        success: true,
                        from: from,
                        message: "Te enviamos un email para validarlo, por favor verifica tu casilla para completar el signUp"
                    })
                }
            }
        } catch (error) {
            res.json({ success: false, message: "Algo a salido mal, intentalo en unos minutos", console:console.log(error)})
            
        }

    },
    
    
    signInUsers: async (req, res) => {
        const { email, password, from } = req.body.logedUser
        try {
            const userExist = await User.findOne({ email })
            // const indexpass = userExist.from.indexOf(from)
            if (!userExist) {
                res.json({success: false, message: "Tu ususario no ha sido registrado, realiza signUp"})
            }else{
                if(from !== "form-Signup"){
                    let passwordMatch = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))
                    if(passwordMatch.length > 0){
                        const userData = {
                            id: userExist._id,
                            firstName: userExist.firstName,
                            lastName: userExist.lastName,
                            country: userExist.country,
                            email: userExist.email,
                            imgProfile: userExist.imgProfile,
                            from: from,
                        }
                        
                        await userExist.save()
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})
                        res.json({
                            success: true,
                            from: from,
                            response: {token, userData},
                            message: "Bienvenido nuevamente " + userData.firstName,
                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: "No has realizado el registro con " + from + " si quieres ingresar con este metodo debes hacer el signUp con " + from
                        })
                    }
                }else {
                    if(passwordMatch.length >0){
                        const userData = {
                            id: userExist._id,
                            firstName: userExist.firstName,
                            email: userExist.email,
                            from:from,
                        }
                        await userExist.save()
                        res.json({
                            success: true,
                            from: from,
                            response: { token, userData },
                            message: "Bienvenido Nuevamente " + userData.fullName,
                        })
                    }else{
                        res.json({
                            success: false,
                            from: from,
                            message: "El usuario o el password no coinciden",
                        })
                    }
                }
            }
        } catch (error){
            res.json({ success: false, message: "Algoa salido mal, intentalo en unos minutos", console:console.log(error) })
        }
    },
    verifyMail: async (req, res) => {
        const {string} = req.params
        const user = await User.findOne({uniqueString: string})
        //console.log(user)
        if (user) {
            user.verification = true
            await user.save()
            res.redirect("http://localhost:3000")
        }
        else {res.json({
            success: false,
            message: `email has not account yet!`})
        }
    },

    // VerificationToken:(req, res) => {
    //     const user = {
    //         id: req.user.id,
    //         mail: req.user.mail,
    //         nameUser: req.user.nameUser,
    //         photoUser: req.user.photoUser,
    //         role: req.user.role,
    //         from: "token"}
    //     //console.log(req.user)
    //     if (!req.err) {
    //     res.json({
    //         success: true,
    //         response: {user},
    //         message: "Hi! Welcome back "+req.user.nameUser}) 
    //     } else {
    //         res.json({
    //             success:false,
    //             message:"sign in please!"}) 
    //     }
    // }
}

module.exports = usersControllers