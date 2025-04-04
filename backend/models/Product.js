import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
    name : {
        type :String,
        required :[true,"Mehsul adini daxil edin"],
        maxLength:[100,"Mehsulun adi maksimum simvolu ehate etmelidir"]
    },
    price : {
        type : Number,
        required :[true,"Mehsul qiymetini daxil edin"],
        maxLength :[7,"Mehsul qiymeti 7 simvoldan cox ola bilmez"]
    },
    description : {
        type :String,
        required :[true,"Aciglama daxil edilmelidir"]
    },
    ratings :{
        type :Number,
        default : 0
    },
    images : [
        {
            public_id : {
                type :String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category: {
        type:String,
        required:[true,"Kategoriyani daxil edin"],
        enum:{
            values: [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Sports",
                "Outdoor",
                "Home",
      
            ],message: "Zehmet olmasa duzgun kategoriyani daxil et"
        }
        
    },
    seller:{
        type:String,
        required:[true,"Satici adini daxil edin"]
    },
    stock:{
        type:String,
        required:[true,"Stock miqdarini daxil edin"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true


            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false
    }
},{timestamps:true})

export default mongoose.model("Product",productSchema)
