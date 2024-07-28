import mongoose from "mongoose";

const schema = mongoose.Schema

const questionResultSchema = new schema(
  {

  question_id: { type: schema.Types.ObjectId, ref: 'Question' },
  correct_answer: { type: Number, required: true },
  chosen_answer: { type: Number, required: true }

}
);

const reportSchema = new schema(
  {

  user: { type: schema.Types.ObjectId, ref: 'User' },
  quiz: { type: schema.Types.ObjectId, ref: 'Quizzes' },
  quiz_result: {
    total_questions: { type: Number, required: true },
    correct_answers: { type: Number, required: true },
    incorrect_answers: { type: Number, required: true },
    question_results: [questionResultSchema]
  
  },
  
  quiz_date: { type: Date, default: Date.now }

}
,
{
  timestamps : true
});

const Report = mongoose.model('Report', reportSchema);

export default Report;


