const User = require('../models/signUsers')
const bcryptjs = require('bcryptjs')


const usersControllers ={
    signUpUsers: async (req, res) => {
        let { firstName, lastName, email, password, from, country, imgProfile } = req.body.userData
        // const test = req.body.test
        try {
            const userExist = await User.findOne({ email })
            if (userExist) {
                if (userExist.from.indexOf(from) !== -1) {
                    res.json({
                        success: false,
                        from: "signup",
                        message: "Ya has realizado tu SingUp de esta forma por favor realiza SignIn"
                    })
                } else {
                    const passwordHasheada = bcryptjs.hashSync(password, 10)
    
                    userExist.from.push(from)
                    userExist.password.push(passwordHasheada)
                    res.json({
                        success: true,
                        from: "signup",
                        message: "Agregamos " + from + " a tus medios para realizar signIn"
                    })
                }
            } else {
                const passwordHasheada = bcryptjs.hashSync(password, 10)
                const newUser = await new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    from,
                    country,
                    imgProfile
                })
                if (from !== "from-Signup") {
                    await newUser.save()
                    res.json({
                        success: true,
                        from: "signup",
                        message: "Felicitaciones se ha creado tu usuario con " + from
                    })
                } else {
                    await newUser.save()
                    res.json({
                        success: true,
                        from: "signup",
                        message: "Te enviamos un email para validarlo, por favor verifica tu casilla para completar el signUp"
                    })
                }
            }
        } catch (error) {
            res.json({ success: false, message: "Algo a salido mal, intentalo en unos minutos", console:console.log(error)})
            
        }

    },
    
    
    signInUsers: async (req, res) => {
        const { firstName, lastName, email, password, from, country } = req.body.logedUser
        try {
            const userExist = await User.findOne({ email })
            const indexpass = userExist.from.indexOf(from)
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
                        res.json({
                            success: true,
                            from: from,
                            response: {userData},
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
    } 
}

module.exports = usersControllers