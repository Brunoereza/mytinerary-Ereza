const mongoose = require ('mongoose')

const intinerarySchema = new mongoose.Schema({
    
    publisher:{type:String, required:true},
    imagePublisher:{type:String, required:true},
    price:{type:String, required:true},
    duration:{type:String, required:true},
    hashtags:{type:Array, required:true},
    likes:{type:Array, required:true},
    activities: [{type:mongoose.Types.ObjectId, ref:'activities'}],//llamo el objectId de activities
    comments: [{userId:{type:mongoose.Types.ObjectId, ref: "users"}, comment:{type:String}}],
    city: {type: mongoose.Types.ObjectId, ref: "Cities"},//los nombres de las colecciones van en plural
    
})

const Intinerary = mongoose.model('intinerary', intinerarySchema)
module.exports=Intinerary