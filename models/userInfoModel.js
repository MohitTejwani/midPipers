const mongoose = require('mongoose');
const userInfoSchema = mongoose.Schema({
    userName:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
})
module.exports = mongoose.model('UserInfo',userInfoSchema);
