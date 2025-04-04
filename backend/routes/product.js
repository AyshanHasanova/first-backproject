// backende pathlari ele alr

import express from "express"
import { getProducts } from "../controllers/productController.js"

const router=express.Router()
// Get isteyinin marsurutunu qurulmasi
router.get("/mehsullar",getProducts)

export default router