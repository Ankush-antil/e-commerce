const mongoose = require('mongoose');


const userCart = new mongoose.Schema({


 userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items:[{
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            size:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true,
                min: 1
            }
    }],

})

const usercart = mongoose.model("usercart", userCart)
module.exports = usercart 

