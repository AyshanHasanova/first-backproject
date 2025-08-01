import User from "../models/User.js"
import catchAsyncError from "../middlewares/catchAsyncError.js"; // async errorları tutmaq üçün wrapper
import ErrorHandler from '../utils/errorHandler.js'; // error handling class-ı
import { sendEmail } from '../utils/sendEmail.js';

import { getResetPasswordTemplate } from '../utils/emailTemplates.js';





export const forgotPassword = catchAsyncError(async(req,res,next)=> {
    //find user in the database
    const user = await User.findOne({email:req.body.email})
 
 
 
 
    if(!user) {
        return next(new ErrorHandler("User not found with this email", 404))
    }
 
 
    // eger istifadeci tapilsa resetPasswordToken lazim olacaq
 
 
    const resetToken = user.getResetPasswordToken()
 
 
    await user.save()
 
 
    //create reset password url
 
 
    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`
 
 
    const message = getResetPasswordTemplate(user?.name, resetUrl)
 
 
 
 
    try {
        await sendEmail({
            email:user.email,
            subject: 'AKTIS Shifre Resetleme',
            // message:message
            message
        })
 
 
        res.status(200).json({
            message: `Email send to :${user.email}`
        })
    }
 
 
    catch(err) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
 
 
        await user.save() //bunu arashdir
        return next(new ErrorHandler(err?.message, 500))
 
 
    }
 })
 