import { Request, Response } from "express";
import { Quizzes } from "../model/quiz";
import { Questions } from "../model/quiz";
import { connect } from "../dbconfig/db";

// Establish MongoDB connection
connect();

const creatQuiz = async (req :Request,  res : Response ) => {
  try {
    const { quizName , tags , questions } = req.body
    const questionId = []
    for(let question of questions){
      const newQuestion = await Questions.create(question)
      questionId.push(newQuestion._id)
    }

    const newQuiz = await Quizzes.create({
      quizName,
      tags,
      question: questionId
    })
    res.status(201).json(newQuiz)
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Server error' });

  }
}

export { creatQuiz }