const { userRegisterType ,userLoginType } = require("../type/usretype")
const User = require("../module/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function register(req,res) {

    try { 
    const {name, email , password} = req.body

    if (!name || !email || !password){
        res.status(404).send("missing data ")
    }
     
    const result = userRegisterType.safeParse({name,email,password})
   if(!result.success){ 
    console.log("invalid data type")
    return res.status(420).send("invalid data type")
} 
const data = result.data

 

 const idcheck = await User.findOne({email : data.email} )

 if(idcheck){
    return res.status(400).send(
       {message : "this id is already register"})
 }
   
    const pass_has = await bcrypt.hash(data.password,10 )
   
     let data_pas = await User.create({
        name : data.name,
        email : data.email,
        password : pass_has
       
    })
     

     const token = jwt.sign(
        {id: data_pas._id}, process.env.JWT_SECRET,{expiresIn: "1h"} 
    )

    return res.status(200).send({
    
        message: "user registered successfully",
        data: token,
        user_id : data_pas._id
    })

} catch (error) {
     console.log(error)
     return res.status(400).send({
        message :"problem",
        error : error.message
     })
   }
}

async function signup(req , res) {
    try{

 const { email,password} = req.body
    if (!email||!password){
        res.status(404).send("missing data ")
    }
const result = userLoginType.safeParse({email,password})
   if(!result.success){ 
    return res.status(420).send("invalid data type")
} 
   const data = result.data
 const check = await User.findOne({email : data.email} )
  
  if(!check){ 
        return res.status(400).send({
            message: "user does not exist with this email"
            
        })
    }
const copm = await  bcrypt.compare(data.password, check.password)
if(!copm){
    return res.status(404).send("worng password")
}
 const token = jwt.sign(
        {id: check._id}, process.env.JWT_SECRET,
    )

     return res.status(200).send({
        message: "user singup successfully",
        data: token,
        user_id : check._id
    })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            error: error.message
        }) }
    
}

    async function adminLogin(req, res){
    try{
        const{email, password} = req.body
        if(!email || !password){
            return res.status(400).send({
                message: "credentials are missing"
        })
       }
    
          
       if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD){
            return res.status(400).send({
                message: "Invalid credentials"
            })
       }

       const token = jwt.sign(
        {
            email: email
        },
        process.env.JWT_SECRET,
       )

       return res.status(200).send({
        message: "admin login successfully",
        data: token 

       })
    } catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            error: error.message
        })
    }

}
    

module.exports = {register,signup,adminLogin}