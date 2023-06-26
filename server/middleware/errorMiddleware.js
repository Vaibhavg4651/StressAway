const errorHandler = (err, req, res, next) => {
    res.status(statusCode)
    res.json({
      message: err.message,
      stack: err.stack,
    })
  }
  
  export {errorHandler }
  