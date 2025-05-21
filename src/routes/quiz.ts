import express  from "express";
import { creatQuiz, creatQuestion, renderQuiz} from "../controllers/quiz";
import { authMiddleware } from "../middleware/authmiddleware";

const router = express.Router()

router.get("/create",authMiddleware,renderQuiz)
router.post("/quiz",authMiddleware,creatQuiz)
router.post("/question",authMiddleware,creatQuestion)

export default router
