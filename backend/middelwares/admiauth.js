const jwt = require("jsonwebtoken")

async function authAdmin(req, res, next){
    const authHeader = req.headers.authorization
    let token = authHeader

    // Handle Bearer token format
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7)
    }
     
    if(!token){
       return res.status(401).send({message: "Token not found"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch(error){
        console.log(error)
        return res.status(401).send({
        success: false,
        error: error.message
    })
    }
}
module.exports = authAdmin