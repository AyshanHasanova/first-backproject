import express from "express"
import { forgotPassword } from "../controllers/authControllers.js"
const router=express.Router()

router.post('/password/forget', forgotPassword)

export default router