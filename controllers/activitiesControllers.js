const Activity = require('../models/activities')


const activitiesControllers = {
    getActivities: async (req, res) => {
        let activities
        let error = null
        try {
            activities = await Activity.find()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' :  activities,
            success: error ? false : true,
            error: error,
            consola: console.log(error)
        })
    },
    getOneActivity: async (req, res) => {
        const id = req.params.id
        let activities
        let error = null
        try {
            activities = await Activity.findOne({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : { activities },
            success: error ? false : true,
            error: error
        })
    },

    addActivity: async (req, res) => {
        const {  nameActivity, imgActivity } = req.body.data
        let activity
        let error = null
        try {
            activity = await new Activity({
                nameActivity: nameActivity,
                imgActivity: imgActivity
            }).save()
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },

    modifyActivity: async (req, res) => {
        const id = req.params.id
        const activity = req.body.data
        let activitydb
        let error = null
        try {
            activitydb = await Activity.findOneAndUpdate({ _id: id }, activity, { new: true })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activitydb,
            success: error ? false : true,
            error: error
        })
    },

    getActivityByIntineray: async(req, res) => {
        let activity = [];
        const id = req.params.id;
        const error = null;
        try{
            activity = await Activity.find({ intinerary : id })
            .populate("activity")

        }catch(err){ error = err }
        res.json({
            res: error ? 'ERROR' : activity ,
            success: error ? false : true,
            error: error
        })
    }

}

module.exports = activitiesControllers

