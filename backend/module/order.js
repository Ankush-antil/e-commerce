const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    amount:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    payment:{
        type: Boolean,
        required: true,
        default: false
    },
    date:{
        type: Date,
    }
},
   { timestamps: true }
)

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)
module.exports = Order