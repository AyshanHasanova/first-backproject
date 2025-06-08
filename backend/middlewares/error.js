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

    

}

