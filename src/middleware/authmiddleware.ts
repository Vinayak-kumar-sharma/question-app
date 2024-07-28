import { Request, Response , NextFunction } from "express";

import jwt from "jsonwebtoken";

const authMiddleware = async (req : Request , res : Response ,next : NextFunction) => {
  const token = req.headers.authorization;
  if(!token) {
    return res.status(400).json({ message : "Not enoung details."})
  }
  try {
    
    const verifyToken = jwt.verify(token , "abc+0987654321-xyz")

    next()

  } catch (error) {
    console.error("Token verification failed")
    return res.status(500).json({
      success:false,
      error})
  }
}

export { authMiddleware }