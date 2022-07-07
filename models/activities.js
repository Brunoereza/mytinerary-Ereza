const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    nameActivity: { type:String, required:true},
    imgActivity: {type:String, required:true},
    
})

const Activity = mongoose.model('activities', activitySchema)
module.exports=Activity





