import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true }
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema],
  correctAnswer: { type: Number, required: true }, 
  tags: [String], 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  createdAt: { type: Date, default: Date.now }
});


const quizSchema = new mongoose.Schema({
  quizName: { type: String, required: true, unique: true },
  tags: [String], 
  questionLimit: { type: Number, default: 10 },
  manualQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  isPublic: { type: Boolean, default: true }, 
  createdAt: { type: Date, default: Date.now }
});



const Questions = mongoose.model('Questions',questionSchema)

const Quizzes = mongoose.model('Quizzes',quizSchema)


export { Questions , Quizzes }