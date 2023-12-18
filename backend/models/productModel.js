
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required: [true, "Please Enter product description"]
    },
    price:{
        type:Number,
        required: [true, "Please Enter prdouct Price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required: true
        },
        uri:{
            type:String,
            required: true
        }
    }],
    category:{
        type:String,
        required: [true, "Please Enter Product Category"],
        // can use here enum but we are leaving as it is , handle in frontend
    },
    Stock:{
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);

