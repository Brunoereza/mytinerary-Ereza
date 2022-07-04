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
                        message: "You have already made your SingUp in this way please perform SignIn"
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
                        message: "Congratulations your user has been created with " + from
                    })
                } else {
                    await newUser.save() 
                    console.log(newUser)
                    await sendEmail(email, uniqueString)
                    res.json({
                        success: true,
                        from: from,
                        message: "We send you an email to validate it, please check your box to complete the signUp"
                    })
                }
            }
        } catch (error) {
            res.json({ success: false, message: "Something has gone wrong, try it in a few minutes", console:console.log(error)})
            
        }

    },
    
    
    signInUsers: async (req, res) => {
        const { email, password, from } = req.body.logedUser
        try {
            const userExist = await User.findOne({ email })
            // const indexpass = userExist.from.indexOf(from)
            if (!userExist) {
                res.json({success: false, message: "Your user has not been registered, perform signUp"})
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
                            message: "Welcome back " + userData.firstName,
                        })
                    } else {
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


