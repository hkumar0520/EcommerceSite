
const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.messsage = err.messsage || "Internal Server Error";

    // wrong MongoDb id error, mongodb id is not of correct length( CastError type)
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`;
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