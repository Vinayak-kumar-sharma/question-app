import { connect } from "../dbconfig/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../model/user"


import {NextFunction, Request,Response} from "express"

connect()

const loginPage = async (req:Request ,res : Response) => {
  try {
    
    const { email , password } = req.body
    const user : any = await User.findOne({email})

    if(!user) {
      return res.status(400).json({
        success : false,
        message : "Email not exits."
      })
    }
    
    const passwordCheck = await bcrypt.compare(password,user.password);
    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password."
      });
    }
    const tokenData = {
      userId : user._id,
      name : user.name,
    }
    
    const token = jwt.sign(tokenData,"abc+0987654321-xyz",{ expiresIn: '1h' })
    
    // return res.status(201).cookie('token',token,{ httpOnly : true }).json({
    //   success : true ,
    //   message : "Successfully LoggedIn.",
    // })
    
    return res.status(201).cookie('token',token,{ httpOnly : true }).redirect("/dashboard")

  } catch (error) {
    console.log( "Somenthing went wrong..." + error )
    return res.status(500).json({error})
  }
}

const logoutPage = async (req:Request,res:Response) => {
  try {
    
    const token = req.cookies.token;
    if(!token) {
      return res.status(400).json({
        success: false,
        message :"Token is not present."
      })
    }
    const verifyToken : any   = jwt.verify(token,"abc+0987654321-xyz");
    if(!verifyToken) {
      return res.status(400).json({message:"Token is not verified."})
    }
    res.clearCookie('token')
    return res.status(201).cookie('token',token,{ httpOnly : true }).redirect("/")

  } catch (error) {
    console.error("Something went wrong:", error);
    return res.json({
      success:false,
      error : "Internal Server Error."
    }).status(500)
  }
}


export { loginPage, logoutPage }