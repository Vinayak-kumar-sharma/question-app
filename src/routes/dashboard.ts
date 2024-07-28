import express ,{Request , Response} from "express" 
import { authMiddleware } from "../middleware/authmiddleware"

const router = express.Router()

router.get("/dashboard",authMiddleware,(req:Request,res:Response)=>{
  return res.render("../src/views/pages/dashboard")

})

export default router