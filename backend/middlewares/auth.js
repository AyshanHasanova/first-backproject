import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from 'jsonwebtoken'
 
export const isAuthenticatedUser = catchAsyncError( async(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return  next (new ErrorHandler ("Mehsullari gormek ucun birinci giris etmelisen",401))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    console.log(decoded)
    req.user = await User.findById(decoded.id)
    console.log(req.user)
    next()
}

)

export const authorizeRoles = (...roles)=>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} bu rola sahib shexsler bu sehifeye giris ede bilmez`, 403));
        }
        next();
    }
}

