import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Istfadeci adini daxil edin"],
        maxLength :[50,"Istfadeci adi 50 simvoldan cox ola bilmez"]


    },
    email:{
        type:String,
        required:[true,"Istfadeci emailni daxil edin"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Shifrenizi daxil edin"],
        minLength: [6,"Shifre en azi 6 simvoldan ibaret olmalidir"],
        select: false
    },
    avatar: {
        public_id : String,
        url: String
    },
    role: {
        type:String,
        default:"user"
    },
    resetPasswordToken :String,
    resetPasswordExpire : Date
    // reqemsal imza link sifrlenmis melumat
    
},{timestamps:true})
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
         next()
    }
    this.password = await bcrypt.hash(this.password,12)
})

userSchema.methods.JwtTokeniEldeEt = function () {
    return jwt.sign({
        id:this._id
    },process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.shifreleriMuqayiseEt = async function (password){
    return await bcrypt.compare(password,this.password)
}

// generate password reset token


userSchema.methods.getResetPasswordToken = function() {
    //generate token
 
 
    const resetToken = crypto.randomBytes(20).toString("hex")
    //hash and set to resetPasswordToken field
 
 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
 
 
    //set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60*1000
 
 
    return resetToken
 }
 


export default mongoose.model("User",userSchema)