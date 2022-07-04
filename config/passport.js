const passport = require("passport")//se usa cuando el usuario recarga la pagina para no perder el usuario
const jwtStrategy = require("passport-jwt").Strategy //estrategia
const extractJwt = require("passport-jwt").ExtractJwt //

const User = require("../models/signUsers") //importo mi modelo de usuario 

module.exports = passport.use(
    new jwtStrategy(
        {
            jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY
        },
        async (jwt_payload, done) => {
            //console.log(jwt_payload)
            try {
                const user = await User.findOne({ _id: jwt_payload.id })
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            }
            catch (error) {
                console.log(error)
                return done(error, false)
            }
        }
    ))
