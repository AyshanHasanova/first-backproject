import User from "../models/User.js"
import catchAsyncError from "../middlewares/catchAsyncError.js"; // async errorları tutmaq üçün wrapper
import ErrorHandler from '../utils/errorHandler.js'; // error handling class-ı
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto'; // Token-i hash-ləmək üçün
import sendToken from "../utils/sendToken.js"

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


 //Reset password => /api/v1/password/reset/:token
export const resetPassword = catchAsyncError(async(req,res,next)=> {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne(
        {resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })
 
 
    if(!user) {
        return next(new ErrorHandler("Password reset token is invalid or has been expired", 400))
    }
 
 
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesnt match", 400))
    }
 
 
    //set new password
 
 
    user.password = req.body.password
 
 
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
 
 
    await user.save()
 
 
    sendToken(user, 200, res)
 
 
 
 
 })



// Update Password  =>  /api/v1/password/update
export const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req?.user?._id).select("+password");
  
    // Check the previous user password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old Password is incorrect", 400));
    }
  
    user.password = req.body.password;
    user.save();
  
    res.status(200).json({
      success: true,
    });
  });
  
 
 
 