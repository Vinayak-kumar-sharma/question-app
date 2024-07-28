import express from "express"
import { registerUser } from "../controllers/user"
import { loginPage, logoutPage } from "../controllers/login"
const router = express.Router()

//post /user

router.post("/login",loginPage)
router.post("/signup",registerUser)
router.get("/logout",logoutPage)

export default router
