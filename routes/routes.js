const Router = require('express').Router();
const validator = require ('../config/validator')
const citiesControllers = require('../controllers/citiesControllers');
const intinerariesControllers = require('../controllers/intinerariesControllers');
const usersControllers = require('../controllers/usersControllers')
const passport = require('../config/passport');
const activitiesControllers = require('../controllers/activitiesControllers')
const commentsControllers = require('../controllers/commentsControllers')


const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities} = citiesControllers
const {getIntineraries, getOneIntinerary, addIntinerary, modifyIntinerary, removeIntinerary, multiplesIntineraries,  getItineraryByCity, likeDislike}= intinerariesControllers
const {signUpUsers, signInUsers, verifyMail, signOut, VerificationToken} = usersControllers
const {getActivities, getOneActivity, getActivityByIntineray, addActivity, modifyActivity} = activitiesControllers
const {addComment, modifyComment, deleteComment} = commentsControllers


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

Router.route("/intineraries/likes/:id")
.put(passport.authenticate('jwt',{ session:false }),likeDislike)

//ruta signUsers

Router.route("/signup")
.post(validator, signUpUsers)

Router.route("/signin")
.post(signInUsers)

Router.route('/signout')
.post(signOut)

//ruta activities

Router.route("/activity")
.get(getActivities)
.post(addActivity)

Router.route('/activity/:id')
.put(modifyActivity)

Router.route("/getactivitybyintineray/:id")
.get(getActivityByIntineray)

//rutas verificador mail y token

Router.route("/verify/:string")//estos dos son parametros
.get(verifyMail)//llama al controlador

Router.route('/signintoken')
.get(passport.authenticate('jwt',{ session: false }),VerificationToken)

//rutas comentarios

Router.route('/intinerary/comment')
.post(passport.authenticate("jwt",{session: false}), addComment)
.put(passport.authenticate("jwt",{session: false}), modifyComment)

Router.route('./intinerary/comment/:id')
.post(passport.authenticate("jwt",{session: false}), deleteComment)

module.exports = Router