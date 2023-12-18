
const Product = require('../models/productModel')


// Create Product - Admin
exports.createProduct = async (req, res, next) =>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get All Proudcts
exports.getAllProducts = async (req,res,next) =>{

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
};

// Get Prouduct Details
exports.getProductDetails = async(req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success: false,
            message: 'Product not found'
        });
    }   
    
    res.status(200).json({
        success: true,
        product
    })
}

// Update Product -- Admin
exports.updateProduct = async (req,res,next) => {

    let product = Product.findById(req.params.id);

    if(!product)
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })

    product = await Product.findByIdAndUpdate(req.params.id, req.body, 
        {new: true, 
        useFindAndModify:false,
        runValidators:true});

    res.status(200).json({
        success: true,
        product
    })
}

// Delete Product - Admin
exports.deleteProduct = async(req,res,next) => {

    const product = await Product.findById(req.params.id);
   
    if(!product){
        return res.status(500).json({
            success: false,
            message: 'Product not found'
        });
    } 

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Deleted successfully"
    })
}
