
import Product from "../models/Product.js"
import cloudinary from '../config/cloudinary.js'


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

  export const createProduct = async (req, res, next) => {
    const { name, price, description, category, seller, stock } = req.body
    if (!req.file) return next(new ErrorHandler('Şəkil əlavə edin', 400))
  
    const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'products' })
  
    const product = await Product.create({
      name, price, description, category, seller, stock,
      images: [{ public_id: result.public_id, url: result.secure_url }],
      user: req.user._id
    })
  
    res.status(201).json({ success: true, product })
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