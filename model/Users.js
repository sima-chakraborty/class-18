const mongoose = require("mongoose");
const {Schema} = mongoose;
const UsersSchema =  new Schema({
    name : String,
    email : String,
    contact  : Number,
    passward :String

});

const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;