class ErrorHander extends Error{
    constructor(message,statusCode){
        this.message= message;
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}

module.exports = ErrorHander;