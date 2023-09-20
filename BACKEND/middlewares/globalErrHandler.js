const globalErrHandler =(err,req,res,next)=>{
    const stack = err.stack
    const message = err.message
    const status = err.status ? err.status.toString() : 'failed';
    const statusCode = err.statusCode ? err.statusCode.toString() : 500;
    res.status(statusCode).json({
        message,
        status,
        stack,
        
    })

}
module.exports = globalErrHandler