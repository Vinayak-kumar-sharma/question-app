import express from "express"
import { registerUser } from "../controllers/user"
import { loginPage, logoutPage } from "../controllers/login"
import { authMiddleware } from "../middleware/authmiddleware"
import { getDashboard } from "../controllers/dashboard"
const router = express.Router()

//post /user

router.post("/login",loginPage)
router.post("/signup",registerUser)
router.get("/logout",logoutPage)
router.get("/dashboard",authMiddleware,getDashboard)

export default router
