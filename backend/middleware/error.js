
const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.messsage = err.messsage || "Internal Server Error";

    // wrong MongoDb id error, mongodb id is not of correct length( CastError type)
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if(err.code === 11000)
    {
        // "E11000 duplicate key error collection: ecommerceDB.users index: email_1 dup key: { email: \"dalchand4ud@gmail.com\" }"
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);

    }

    // Wrong jsonwebtoken error
    if(err.name === 'JsonWebTokenError')
    {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Expire error
    if(err.name === 'TokenExpiredError')
    {
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message

        // below give error, "error":{"statusCode":404,"messsage":"Internal Server Error"}
        // error: err

        // give full location where error is coming 
        // error: err.stack
    })
}