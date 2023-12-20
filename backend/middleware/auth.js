const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next) => {

    const {token} = req.cookies;
    // console.log(token);

    if(!token){
        return next(new ErrorHandler('Please Login to access this resource', 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

exports.authorizedRoles = (...roles) => {

    return (req,res,next) => {

        // admin is in roles, req.user.role = user
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resrouce`,
                    403
                )
            );
        }

        // if admin below next() is call
        next();
    };
};


