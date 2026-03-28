const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, path.join(__dirname, '../uploads'))
    },
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer({storage})
module.exports = upload