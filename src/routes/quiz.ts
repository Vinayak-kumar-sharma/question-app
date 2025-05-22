import express  from "express";
import { creatQuiz, creatQuestion, renderQuiz, getAllQuizzes,getBySlug} from "../controllers/quiz";
import { authMiddleware } from "../middleware/authmiddleware";

const router = express.Router()

router.get("/create",authMiddleware,renderQuiz)
router.get("/quizzes",authMiddleware,getAllQuizzes)
router.get("/:id",authMiddleware,getBySlug)


router.post("/quiz",authMiddleware,creatQuiz)
router.post("/question",authMiddleware,creatQuestion)

export default router
