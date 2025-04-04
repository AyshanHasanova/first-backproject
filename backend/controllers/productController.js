import Product from "../models/Product.js"

// mehsullarin getirilmesi

export const getProducts = async (req,res)=>{
  const products = await Product.find()
  res.status(200).json({
    products
  })
}

export const addProducts = async(req,res)=>{

}