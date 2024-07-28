import express , {Request , Response, urlencoded } from "express"
import userrouter from "./routes/user"
import quizroute from "./routes/quiz"
import { authMiddleware } from "./middleware/authmiddleware"

const app = express()

app.use(urlencoded({extended : false}))
app.set("view engine",'ejs')
app.use(express.json())

app.get("/",(req :Request ,res : Response)=>{
  res.render("../src/views/pages/homepage")
})
app.get("/signup",(req : Request,res : Response)=>{
  res.render("../src/views/pages/index")
})
app.get("/login",(req : Request,res : Response)=> {
  res.render('../src/views/pages/login')
})
app.get("/dashboard",authMiddleware , (req:Request , res : Response) => {
  res.render('../src/views/pages/dashboard')
})

app.use("/user",userrouter)
app.use("/v1",quizroute)





app.listen(3000,()=>{
  console.log(`Server is connected : http://localhost:3000`)
})