import ErrorHandler from "../utils/errorHandler.js"
// Olduqca onemli funkksiyadir
export default (err, req, res, next) => {
    let error = {
        statusCode:err?.statusCode || 500,
        message: err?.message || "Internal Server Error"
    }

    // MongoDB ID Error = CastError


   

    if(err.name === "CastError") {
        const message = `Bu id mongo db sxemine uygun deyil. ${err.path}` //
        error = new ErrorHandler(message,404)
    }

        // development xeta ve xetanin bash verme yeri

    if(process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(error.statusCode).json({
            message:error.message,
            error: err,
            stack: err?.stack
        })
    }


    // production xeta
    if(process.env.NODE_ENV === "PRODUCTION") {
        res.status(error.statusCode).json({
            message:error.message
        })

    }

      // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    error = new ErrorHandler(message, 400);
  }

  // Handle wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid. Try Again!!!`;
    error = new ErrorHandler(message, 400);
  }

  // Handle expired JWT Error
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token is expired. Try Again!!!`;
    error = new ErrorHandler(message, 400);
  }

    

}




