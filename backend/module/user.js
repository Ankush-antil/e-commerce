const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    cart: [
        {
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
        }
    ]
},
   { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
module.exports = User