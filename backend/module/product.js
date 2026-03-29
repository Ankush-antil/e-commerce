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
    images:[{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    reviews:[
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        userName: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5
        },
        text: {
          type: String,
          required: true,
          trim: true
        },
        date: {
          type: Date,
          required: true,
          default: Date.now
        }
      }
    ]
},
   { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)
module.exports = Product