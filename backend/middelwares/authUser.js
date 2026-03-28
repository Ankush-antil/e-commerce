const jwt = require("jsonwebtoken")

async function authUser(req, res, next){
    const authHeader = req.headers.authorization
    let token = authHeader

    // Handle Bearer token format
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7)
    }

    if(!token){
        return res.status(401).json({
            message: "Token not found"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch(error){
        console.log(error)
        return res.status(401).json({
        success: false,
        error: error.message
    })
    }
}

module.exports = authUser