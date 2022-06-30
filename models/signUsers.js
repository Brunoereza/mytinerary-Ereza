const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String, required:true},
    country:{type:String},
    imgProfile:{type:String},
    password:[{type:String, required:true}],
    from:{type:Array},
})

const User = mongoose.model('users', userSchema)
module.exports=User