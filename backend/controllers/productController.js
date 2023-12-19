
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create Product - Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) =>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

// Get All Proudcts
exports.getAllProducts = catchAsyncErrors(async (req,res,next) =>{

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
});

// Get Prouduct Details
exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    } 
    
    res.status(200).json({
        success: true,
        product
    })
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req,res,next) => {

    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, 
        {new: true, 
        useFindAndModify:false,
        runValidators:true});

    res.status(200).json({
        success: true,
        product
    })
});

// Delete Product - Admin
exports.deleteProduct = catchAsyncErrors(async(req,res,next) => {

    const product = await Product.findById(req.params.id);
   
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Deleted successfully"
    })
});
