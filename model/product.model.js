const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
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
    
    editorID:{
        type:String,
    required:true},
})

const ProductModel = mongoose.model("product",productSchema)

module.exports = {ProductModel}