
import Product from "../models/Product.js"



// mehsullarin getirilmesi

export const getProducts = async (req,res)=>{
  const products = await Product.find()
  res.status(200).json({
    products
  })
}

  export const getProductsDetails = async (req,res)=>{
    const product= await Product.findById(req?.params?.id)
    if(!product){
      res.status(404).json({
        message:"Mehsul stokda tukenib"
      })
    }
    res.status(200).json({
      product
    })
  }

  export const createProduct = async (req,res)=>{
    const product = await Product.create(req?.body)
    if(!product){
      res.status(404).json({
        message: "Mehsul elave etmemisen!"
      })
    }
    res.status(201).json({
      product
    })
  }

  export const deleteProduct =  async (req,res)=>{
    const product = await Product.findById(req?.params?.id)
    if(!product){
     res.status(404).json({
      message : "Mehsul taplmadi"
     })
    }

    await product.deleteOne()
    res.status(200).json({
      message: "Mehsul silindi"
    })
  }

  export const updateProduct = async (req,res)=>{
    const product = await Product.findByIdAndUpdate(req?.params?.id,req.body,{
      new:true
    })
    res.status(200).json({
      product
    })
  }