const { userRegisterType ,userLoginType } = require("../type/usretype")
const User = require("../module/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function register(req,res) {

    try { 
    const {name, email , password} = req.body

    if (!name || !email || !password){
        return res.status(400).json({message: "missing data"})
    }
     
    const result = userRegisterType.safeParse({name,email,password})
   if(!result.success){ 
    console.log("validation error:", result.error.errors)
    return res.status(400).json({message: result.error.errors[0].message})
} 
const data = result.data

 

 const idcheck = await User.findOne({email : data.email} )

 if(idcheck){
    return res.status(400).json(
       {message : "this email is already registered"})
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

    return res.status(200).json({
    
        message: "user registered successfully",
        data: token,
        user_id : data_pas._id
    })

} catch (error) {
     console.log(error)
     return res.status(500).json({
        success: false,
        message :"Registration failed",
        error : error.message
     })
   }
}

async function signup(req , res) {
    try{

 const { email,password} = req.body
    if (!email||!password){
        return res.status(400).json({message: "email and password are required"})
    }
const result = userLoginType.safeParse({email,password})
   if(!result.success){ 
    console.log("validation error:", result.error.errors)
    return res.status(400).json({message: result.error.errors[0].message})
} 
   const data = result.data
 const check = await User.findOne({email : data.email} )
  
  if(!check){ 
        return res.status(400).json({
            message: "user does not exist with this email"
            
        })
    }
const compare = await bcrypt.compare(data.password, check.password)
if(!compare){
    return res.status(401).json({message: "wrong password"})
}
 const token = jwt.sign(
        {id: check._id}, process.env.JWT_SECRET, {expiresIn: "1h"}
    )

     return res.status(200).json({
        message: "user login successfully",
        data: token,
        user_id : check._id
    })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        }) }
    
}

    async function adminLogin(req, res){
    try{
        const{email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message: "credentials are missing"
        })
       }
    
          
       if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({
                message: "Invalid credentials"
            })
       }

       const token = jwt.sign(
        {
            email: email
        },
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
       )

       return res.status(200).json({
        message: "admin login successfully",
        data: token 

       })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Admin login failed",
            error: error.message
        })
    }

}
    

module.exports = {register,signup,adminLogin}