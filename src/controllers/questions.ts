import { Request , Response } from "express";
import { connect } from "../dbconfig/db";
import { Questions } from "../model/quiz";

connect();

const createQuestion = async (req: Request , res:Response)=>{
  try { const {text , options, correctAnswer } = req.body
    const newQuestion = await new Questions({
      text,
      options,
      correctAnswer
    })
    const savedquestions = await newQuestion.save()

    res.status(200).json(savedquestions)}
  catch(error){
    console.log("Something went wrong")
    return res.status(500).json({error})
  }
}

const updateQuestion = async (req:Request,res:Response) =>{
  const {id} = req.params;
}

export { createQuestion }