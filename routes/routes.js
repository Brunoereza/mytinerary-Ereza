const Router = require('express').Router();
const validator = require ('../config/validator')
const citiesControllers = require('../controllers/citiesControllers');
const intinerariesControllers = require('../controllers/intinerariesControllers');
const usersControllers = require('../controllers/usersControllers')
const passport = require('../config/passport');
// const { VerificationToken } = require('../controllers/usersControllers');


const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities} = citiesControllers
const {getIntineraries, getOneIntinerary, addIntinerary, modifyIntinerary, removeIntinerary, multiplesIntineraries,  getItineraryByCity}= intinerariesControllers
const {signUpUsers, signInUsers, verifyMail, signOut, VerificationToken} = usersControllers


Router.route('/cities')
.get(getCities)
.post(addCity)

Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)
Router.route("/multiplesCities")
.post(multiplesCities)

//ruta intineraries

Router.route('/intinerary')
.get(getIntineraries)
.post(addIntinerary)

Router.route('/intinerary/:id')
.delete(removeIntinerary)
.put(modifyIntinerary)
.get(getOneIntinerary)

Router.route("/multiplesIntineraries")
.post(multiplesIntineraries)

Router.route("/intinerarybycity/:id")
.get(getItineraryByCity)

//ruta signUsers

Router.route("/signup")
.post(validator, signUpUsers)

Router.route("/signin")
.post(signInUsers)//

// Router.route("/signout")
// .post(SignOut)

Router.route('/signout')
.post(signOut)

Router.route("/verify/:string")//estos dos son parametros
.get(verifyMail)//llama al controlador

Router.route('/signintoken')
.get(passport.authenticate('jwt',{ session: false }),VerificationToken)

module.exports = Router