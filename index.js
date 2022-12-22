const express = require("express")

const app = express()
require('dotenv').config()

const {connection} = require("./config/db.js")
const {authRouter} = require("./routes/auth.route.js")
const {productRouter} = require("./routes/product.route")
const {cartRouter}  =  require("./routes/cart.route.js")
const {ProductModel} = require("./model/product.model")
const {AuthModel} = require('./model/auth.model');
const cors = require('cors')

 
app.use(cors())
app.use(express.json())


app.get("/",async(req,res)=>{

    const query = req.query
    //res.send("welcome to our ecommerce website")
    const data = await ProductModel.find(query)
    res.send(data)
})
app.get("/leakalluser",async(req,res)=>{
    try{
        const data = await AuthModel.find()
        res.send(data)

    }catch(err){
        console.log(err);
        res.send({"msg":"error while leaking"})
    }
})
app.use("/",authRouter)

app.use("/products",productRouter)

app.use("/cart",cartRouter)
app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("connected to db successfully")
    } catch (error) {
        console.log("error in getting connected to db")
        console.log(error)
    }
    console.log(`listening on port ${process.env.PORT}`)


})