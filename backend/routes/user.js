
import express from "express"
import { getUserProfile, loginUser, logout, registerUser } from "../controllers/userControllers.js"

import {isAuthenticatedUser} from "../middlewares/auth.js"
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logout)



router.get("/me", isAuthenticatedUser, getUserProfile)


export default router