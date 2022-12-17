const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    Name:{
        type:String,
    required:true},

    email:{
        type:String,
    required:true},

    password:{
        type:String,
    required:true},

    role:{
        type:String,
    enum:["admin","user"],
    required:true}
})

const AuthModel = mongoose.model("auth",authSchema)

module.exports = {AuthModel}