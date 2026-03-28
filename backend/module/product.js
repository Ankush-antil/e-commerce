const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    subCategory:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    sizes:{
        type: Array,
        required: true
    },
    bestSeller:{
        type: Boolean,
        required: true,
        default: false
    },
    images:{
        public_id:String,
        type: Array,
        required: true
    },
    
},
   { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)
module.exports = Product