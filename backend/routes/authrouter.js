import express from "express"
import { forgotPassword,  resetPassword, updatePassword } from "../controllers/authControllers.js"


import { isAuthenticatedUser } from "../middlewares/auth.js"
const router=express.Router()

router.post('/password/forget', forgotPassword)
router.put('/password/reset/:token', resetPassword)
router.put('/password/update', isAuthenticatedUser, updatePassword);

export default router