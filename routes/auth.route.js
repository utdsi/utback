const express =  require("express")
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

const {AuthModel} =require("../model/auth.model")

authRouter.post("/signup",async(req,res)=>{

    const {Name,email,password,role} = req.body
    const authPresent = await AuthModel.findOne({email})

    if(authPresent){
        res.send({"msg":"try logging in admin already present"})
    }
    try {
        bcrypt.hash(password, 6, async function(err, hash) {
            // Store hash in your password DB.
            const auth  = new AuthModel({Name,email,password:hash,role})
            await auth.save()
            res.send({"msg":"signup successfull"})
        });
    } catch (error) {
        console.log("error in signing up")
        console.log(error)
    }
})

authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body

    try {
        const auth = await AuthModel.find({email})
        console.log(auth);
        
        if(auth.length>0){
            const hash_password  = auth[0].password
            
            if(auth[0].role == "admin"){
                bcrypt.compare(password, hash_password, function(err, result) {
                    // result == true
                    if(result){
                        const token = jwt.sign({"editorID":auth[0]._id},"admin")
                        res.send({"msg":"admin login successfull","token":token,role:"admin"})
                    }else{
                        res.send({"msg":"login failed"})
                    }
                });
            }else if(auth[0].role == "user"){
                bcrypt.compare(password, hash_password, function(err, result) {
                    // result == true
                    if(result){
                        const token = jwt.sign({"Userid":auth[0]._id},"hush")
                        res.send({"msg":"user login successfull","token":token,role:"user"})
                    }else{
                        res.send({"msg":"login failed"})
                    }
                });

            }
            
        }else {
            res.send({"msg":"login failed"})
            //await UserModel.find({email})


        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong, please try again later"})
    }
})

module.exports = {authRouter}