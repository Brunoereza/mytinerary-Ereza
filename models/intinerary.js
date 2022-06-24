const mongoose = require ('mongoose')

const intinerarySchema = new mongoose.Schema({
    
    publisher:{type:String, required:true},
    imagePublisher:{type:String, required:true},
    price:{type:String, required:true},
    duration:{type:String, required:true},
    hashtags:{type:Array, required:true},
    likes:{type:Array, required:true},
    activities: {type:String, required:true},
    city: {type: mongoose.Types.ObjectId, ref: "Cities"}
    
})
console.log(mongoose)
const Intinerary = mongoose.model('intinerary', intinerarySchema)
module.exports=Intinerary