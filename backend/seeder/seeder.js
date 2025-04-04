import mongoose from "mongoose";
import products from "./data.js"

import Product from "../models/Product.js";


const seedProducts = async()=>{
try{
 await mongoose.connect("mongodb://localhost:27017/backend5")
 await Product.deleteMany()
 console.log("zibillik temizlendi")
 await Product.insertMany(products)
 console.log("Mehsullar geldi")
 process.exit()
}
catch(err){
console.log(err.message)
process.exit()
}
}

seedProducts()