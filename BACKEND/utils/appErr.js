const appErr = (message,statusCode)=>{
    let error = new Error(message);
    error.stack = error.stack;
    error.statusCode = statusCode ? statusCode.toString() : 500;
    return error
};
module.exports = appErr;