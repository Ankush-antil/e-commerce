const jwt = require("jsonwebtoken")

async function authUser(req, res, next){
    const token = req.headers.authorization

    if(!token){
        return res.status(400).send({
            message: "Token not found"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch(error){
        console.log(error)
        return res.status(500).send({
        success: false,
        error: error.message
    })
    }
}

module.exports = authUser