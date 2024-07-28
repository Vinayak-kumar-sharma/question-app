import express  from "express";
import { creatQuiz } from "../controllers/quiz";
// import { createQuestion } from "../controllers/questions";
import { authMiddleware } from "../middleware/authmiddleware";

const router = express.Router()

router.post("/quiz",authMiddleware,creatQuiz)
// router.post("/question",authMiddleware,createQuestion)

export default router
