const express = require("express")

const app = express()
require('dotenv').config()

const {connection} = require("./config/db.js")
const {authRouter} = require("./routes/auth.route.js")
const {productRouter} = require("./routes/product.route")
const {cartRouter}  =  require("./routes/cart.route.js")
const cors = require('cors')

 
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use("/",authRouter)

app.use("/products",productRouter)

app.use("/cart",cartRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db successfully")
    } catch (error) {
        console.log("error in getting connected to db")
        console.log(error)
    }
    console.log(`listening on port ${process.env.port}`)


})