
const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    logo:{
        type:String,
    required:true},

    title:{
        type:String,
    required:true},

    category:{
        type:String,
    required:true},

    type:{
        type:String,
    required:true},

    price:{
        type:Number,
    required:true},

    rating:{
        type:Number,
    required:true},
    
    Userid:{
        type:String,
    required:true},
})

const CartModel = mongoose.model("cart",cartSchema)

module.exports = {CartModel}