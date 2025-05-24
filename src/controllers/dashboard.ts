import { Request, Response} from "express"
import Report from "../model/report"



const getDashboard = async (req: Request, res: Response) => {
  
  const userId = (req as any).user.userId;

  if (!userId) {
    return res.status(401).send('Unauthorized');
  }

  try {
    
    const reports: any[] = await Report.find({ user: userId })
      .populate('quiz')
      .sort({ quiz_date: -1 })
      .lean();

    let totalCorrect = 0;
    let totalQuestions = 0;
    let bestScore = 0;
    const scorePercentages: number[] = [];

    for (const report of reports) {
      const { correct_answers, total_questions } = report.quiz_result;

      if (total_questions === 0) continue;

      const percentage = (correct_answers / total_questions) * 100;
      scorePercentages.push(percentage);

      totalCorrect += correct_answers;
      totalQuestions += total_questions;

      if (percentage > bestScore) bestScore = percentage;
    }

    const averageScore =
      scorePercentages.length > 0
        ? parseFloat(
            (
              scorePercentages.reduce((sum, val) => sum + val, 0) / scorePercentages.length
            ).toFixed(2)
          )
        : 0;

    const totalQuizzes = reports.length;
    const recentReports = reports.slice(0, 5);

    res.render('../src/views/pages/dashboard', {
        totalQuizzes: totalQuizzes || 0,
        totalQuestions: totalQuestions || 0,
        totalCorrect: totalCorrect || 0,
        averageScore: averageScore || 0,
        bestScore: bestScore || 0,
        recentReports: recentReports || []
    });


  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


export { getDashboard }