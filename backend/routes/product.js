// backende pathlari ele alr

import express from "express"
import { createProduct,  deleteProduct,  getProducts, getProductsDetails, updateProduct } from "../controllers/productController.js"
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js"

const router=express.Router()
// Get isteyinin marsurutunu qurulmasi
router.get("/mehsullar", isAuthenticatedUser, authorizeRoles("admin"), getProducts)
router.get("/mehsullar/:id",getProductsDetails)
router.post("/admin/new", isAuthenticatedUser , authorizeRoles("admin"),createProduct)
router.delete("/admin/delete/:id",isAuthenticatedUser, authorizeRoles("admin"),deleteProduct)
router.put("/admin/edit/:id", isAuthenticatedUser, authorizeRoles("admin"),updateProduct)

export default router