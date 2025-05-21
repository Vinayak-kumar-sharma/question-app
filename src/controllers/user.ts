import express,{ Request, Response } from "express"
import User from "../model/user"
import bcryptjs from "bcryptjs"
import { connect } from "../dbconfig/db"

connect()

const registerUser = async (req:Request,res:Response)=>{

const { name, email, password } = req.body
console.log(req.body)

const checkemail = await User.findOne({ email })

if(checkemail){
  return res.status(400).json({
    success : false,
    message : "Email Already Exits."
  })
}
const salt = bcryptjs.genSaltSync(10)
const ncryptpassword = await bcryptjs.hash(password,salt)

const user = new User(
  {

  name,
  email,
  password:ncryptpassword
  
  }
)
const savedUser = await user.save()
console.log(savedUser)
return res.status(200).redirect('/login')
}

export {registerUser}