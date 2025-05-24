import {Request, Response} from "express"
import { Quizzes } from "../model/quiz";
import Report from "../model/report"


const createReport = async(req:Request, res:Response)=>{
  try {
    
    const user = (req as any).user.userId; // ✅ from auth middleware
    const quiz = req.body.quiz;
    const answers = req.body.answers;

    const quizDoc = await Quizzes.findById(quiz).populate('manualQuestions');
    
    if (!quizDoc) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let correctCount = 0;
    const questionResults = [];

    for (const answer of answers) {
      const question = quizDoc.manualQuestions.find(
        (q: any) => q._id.toString() === answer.question_id
      )as any;

      if (!question) continue;

      const isCorrect = answer.chosen_answer === question.correctAnswer
      if (isCorrect) correctCount++;

      questionResults.push({
        question_id: question._id,
        correct_answer: question.correctAnswer,
        chosen_answer: answer.chosen_answer,
      });
    }

    const reportData = {
      user,
      quiz,
      quiz_result: {
        total_questions: quizDoc.manualQuestions.length,
        correct_answers: correctCount,
        incorrect_answers: quizDoc.manualQuestions.length - correctCount,
        question_results: questionResults,
      },
      quiz_date: new Date(),
    };

    const report = new Report(reportData);
    await report.save();

    return res.status(201).json({
      success: true,
      message: 'Report created successfully',
      report,
    });
  } catch (error) {
    console.error("Error creating report:");
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export {createReport}