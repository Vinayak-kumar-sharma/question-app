import express from "express"
import { createReport } from "../controllers/analytics"
import { authMiddleware } from "../middleware/authmiddleware"
const router = express.Router()

router.post("/",authMiddleware,createReport)

export default router