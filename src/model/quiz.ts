import mongoose from "mongoose";

const schema =  mongoose.Schema

const optionSchema = new schema({
  option : {type : String , required : true}
})

const questionSchema = new schema({
  text : {type : String , required : true},
  options : [optionSchema],
  correctAnswer : {type : Number , required : true}
})

const quizSchema = new schema({
  // author : { type : schema.Types.ObjectId, ref: 'User'},
  quizName :{type : String , required : true , unique : true},
  tags : [String],
  question : [{type : schema.Types.ObjectId , ref : 'Questions' }]
},
{
  timestamps : true
} )

const Questions = mongoose.model('Questions',questionSchema)

const Quizzes = mongoose.model('Quizzes',quizSchema)


export { Questions , Quizzes }