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
    const user = (req as any).user;
    let { quizName, tags, questions } = req.body;

    if (!Array.isArray(questions)) {
      questions = [questions];
    }

    tags = tags?.split(',').map((t: string) => t.trim());

    // Prepare all question documents
    const questionDocs = questions.map((q: any) => ({
      text: q.text,
      options: q.options.split(',').map((o: string) => ({ option: o.trim() })),
      correctAnswer: Number(q.correctAnswer),
      tags: q.tags?.split(',').map((t: string) => t.trim())
    }));

    // Insert all questions in one batch
    const insertedQuestions = await Questions.insertMany(questionDocs);
    const questionIds = insertedQuestions.map((q) => q._id);

    // Create quiz
    const newQuiz = await Quizzes.create({
      quizName,
      tags,
      manualQuestions: questionIds,
      createdBy: user.userId
    });

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully.',
      quiz: newQuiz
    });

  } catch (error) {
    console.error('Error creating quiz:');
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