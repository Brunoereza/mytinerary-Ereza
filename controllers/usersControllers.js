const User = require('../models/signUsers')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendEmail = require('./sendEmail')
const jwt = require ('jsonwebtoken')

const usersControllers ={
    signUpUsers: async (req, res) => {
        let { firstName, lastName, email, password, from, country, imgProfile } = req.body.userData
        //del user data necesito lo que tiene adentro
        //el req.body.userData
        // console.log(req.body.userData)
        // const test = req.body.test
        try {
            const userExist = await User.findOne({ email })//busca si los email son reales, pregunta
            const verification = false //por default
            const uniqueString = crypto.randomBytes(15).toString('hex') //utilizo los metodos crypto
            //randomBytes(15) te trae 15 caracteres random
            // console.log(uniqueString)
            if (userExist) { // si existe el usuario
                if (userExist.from.indexOf(from) !== -1) { //pregunta si existe el tipo de from
                    res.json({
                        success: false,
                        from: from,
                        message: "You have already made your SingUp in this way please perform SignIn"//en este caso existe un form signup, si esta registrado con otro form pushea para que la proxima vez pueda loguearse de la manera que quiera
                    })
                } else {
                    const passwordHasheada = bcryptjs.hashSync(password, 10)
                    userExist.verification = true
                    userExist.from.push(from)
                    userExist.password.push(passwordHasheada)
                    res.json({
                        success: true,
                        from: from,
                        message: "Add " + from + " to your media to make signIn"
                    })
                }
            } else { //si no existe el usuario
                const passwordHasheada = bcryptjs.hashSync(password, 10)//el hashSync es propio de bcryptjs encripta el password que nos da el usuario, el numero que le sigue indica la seguridad del encriptado
                // console.log(req.body.userData)
                const newUser = await new User({//a traves de del constructor new pedimos que haga un nuevo usuario y le decimos que la verificacion es la que indicamos al principio
                    //estos datos los sacamos por parte de body
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
                if (from !== "form-signup") { // si el from es distinto a signup, significa que se registro su cuenta por una red social y no hace falrta verificacion
                    // newUser.verification = true
                    await newUser.save()// el metodo.save se encarga de que el usuario aparezca en mongo con todos sus datos
                    res.json({
                        success: true,
                        from: from,
                        message: "Congratulations your user has been created with " + from
                    })
                } else {
                    await newUser.save() 
                    console.log(newUser)
                    await sendEmail(email, uniqueString) //requiere el email(es el que destructure al principio) para mandar la verificacion, el uniqueString verifica que el usuario sea el correcto
                    res.json({
                        success: true,
                        from: from,
                        message: "We send you an email to validate it, please check your box to complete the signUp"
                    })
                }
            }
        } catch (error) {//si hay algun error lo cachea
            res.json({ success: false, message: "Something has gone wrong, try it in a few minutes", console:console.log(error)})
            
        }

    },
    
    
    signInUsers: async (req, res) => {
        const { email, password, from } = req.body.logedUser //desestructura lo que trae por body// logedUser trae email, password y from que metimos en el front
        try {//de mi coleccion user verifico con findOne si el email existe, si existe lo guarda en la constante UserExist
            const userExist = await User.findOne({ email })
            // const indexpass = userExist.from.indexOf(from)
            if (!userExist) {//el ususario existe? esta negado, el primer caso es si no existe, se le da un succes false porque no esta logueado, si existe esta definido y sino indefinido
                //cuabdo existe entra al else
                res.json({success: false, message: "Your user has not been registered, perform signUp"})
            }else{
                if(from !== "form-Signup"){// se verifica si se tarta de loguear con un form distinto a signup
                    let passwordMatch = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))//se verifica la contraseña(se desencripta) a traves de un filter entrando a la propiedad password y con el metodo    se desencripta, comparamos el password que nos pasa el usuario con el que acaba de desencriptar en el filter, si coinciden me devuelve passwordMatch
                    if(passwordMatch.length > 0){ //si es mayor a cero creamos la const userData donde vamos a traer una serie de propiedad que vamos a necesitar del usuario
                        const userData = {
                            id: userExist._id,
                            firstName: userExist.firstName,
                            lastName: userExist.lastName,
                            country: userExist.country,
                            email: userExist.email,
                            imgProfile: userExist.imgProfile,//viene de la base de datos
                            from: from,
                        }
                        
                        await userExist.save()
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})//dentro de una const token guardamos el token y le aplicamos el metodo jwt.sign(firma es un metodo de jsowebtoken), recibe tres parametros, primero el userdata le paso una secret key para que quede encriptado y digo que el token se va a eliminar en un dia   
                        res.json({//determino que le devuelvo al front para que use
                            success: true,//encontro la password
                            from: from,
                            response: {token, userData},//
                            message: "Welcome back " + userData.firstName,
                        })
                    } else {//en el caso de no encontrar la password no te loguea
                        res.json({
                            success: false,
                            from: from,
                            message: "You didn't register with " + from + " if you want to enter with this method you must make the signUp with " + from
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
                            message: "Welcome Back " + userData.firstName,
                        })
                    }else{
                        res.json({
                            success: false,
                            from: from,
                            message: "The user or password does not match",
                        })
                    }
                }
            }
        } catch (error){
            res.json({ success: false, message: "Something has gone wrong, try it in a few minutes", console:console.log(error) })
        }
    },

    signOut: async(req, res) => {
        const email = req.body.mail
        const user = await User.findOne({email})
        await user
        res.json({
            success: true,
            message: email +' Sign out!'})
    },

    verifyMail: async (req, res) => {//entra a la base de datos y busca el string comouniquestring que nos trae la ruta, entonces a este mail le pasa la verificacion a true
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

    VerificationToken:(req, res) => {

        if (!req.err) {
            console.log(req.err);
        res.json({
            success: true,
            response: {id: req.user.id,
                      firstName:req.user.firstName,
                      email:req.user.email,
                      photo:req.user.photo,
                      from:"token"},
            message: "Hi! Welcome back "+req.user.firstName}) 
        } else {
            res.json({
                success:false,
                message:"sign in please!"}) 
        }
    }

}

module.exports = usersControllers


