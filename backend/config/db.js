const mongoose = require("mongoose")

async function dbcc() {

    mongoose.connect(process.env.DATABASE_URL)
       .then(function(){
           console.log("db connected successfully")
})
        .catch(function(error){
           console.log(error)
           console.log("db not connected")
})
    
} 
module.exports = dbcc