const jwt = require("jsonwebtoken")

async function authAdmin(req, res, next){
    const token =  req.headers.authorization
     
    if(!token){
       return res.status(404).send("error empty => token")
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch(error){
        console.log(error)
        return res.status(440).send({
        success: false,
        error: error.message
    })
    }
}
module.exports = authAdmin