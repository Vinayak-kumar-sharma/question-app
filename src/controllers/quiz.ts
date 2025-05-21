import { Request, Response } from "express";
import { Quizzes } from "../model/quiz";
import { Questions } from "../model/quiz";
import { connect } from "../dbconfig/db";

connect();

const renderQuiz = (req:Request, res:Response)=>{
  res.render("../src/views/pages/createquiz",{questions:[]})
}

const creatQuiz = async (req: Request, res: Response) => {
  try {
    const { quizName, tags, questions } = req.body;
    const questionIds = [];
    for (let question of questions) {
      const newQuestion = await Questions.create({
        text: question.text,
        options: question.options,
        correctAnswer: question.correctAnswer,
        tags: question.tags
      });
      questionIds.push(newQuestion._id);
    }

    const newQuiz = await Quizzes.create({
      quizName,
      tags,
      manualQuestions: questionIds, 
    });

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully.',
      quiz: newQuiz,
    });

  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating quiz.'
    });
  }
};

const creatQuestion = async (req: Request, res: Response) => {
  try {
    const { text, options, correctAnswer, tags } = req.body;

    if (!text || !options || typeof correctAnswer !== 'number') {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newQuestion = new Questions({
      text,
      options,
      correctAnswer,
      tags,
    });

    const savedQuestion = await newQuestion.save();

  
    res.status(201).json({
      success: true,
      message: 'Question created successfully.',
      question: savedQuestion,
    });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { creatQuiz, creatQuestion, renderQuiz }