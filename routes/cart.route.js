const express =  require("express")
const jwt = require("jsonwebtoken")

const cartRouter = express.Router()

const {CartModel} = require("../model/cart.model.js")


const authentication = (req,res,next)=>{
    const token = req.headers?.authorization.split(" ")[1]

    if(token){
        const decoded = jwt.verify(token,"hush")
        //console.log(decoded)

        if(decoded){
            const Userid  = decoded.Userid
            req.body.Userid = Userid
            next()
        }else{
            res.send({"msg":"please login"})
        }
    }else{
        res.send({"msg":"please login"})
    }
}

cartRouter.use(authentication)

cartRouter.get("/",async(req,res)=>{
    const Userid = req.body.Userid
    

    const data = await CartModel.find({"Userid":Userid})
    res.send(data)
})

cartRouter.post("/post",async (req,res)=>{

    try {
        const payload= req.body
        //console.log(payload)

    const cart = new CartModel(payload)

        await cart.save()
        //console.log(product_admin)

        res.send("product added successfully")
    } catch (error) {
        res.send("error in posting the data")
        console.log(error)
    }

    


    
    })



cartRouter.delete("/delete/:cartID",async(req,res)=>{

    try {
        const cartID = req.params.cartID
    const Userid = req.body.Userid

    const cart = await CartModel.findOne({_id:cartID})

    if(Userid !== cart.Userid){
        res.send("not authorised")
        
    }else{
        await CartModel.findByIdAndDelete({_id:cartID})
        res.send("cart deleted successfully")
    }
    } catch (error) {
        console.log(error)
    }
    
    

})

module.exports = {cartRouter}