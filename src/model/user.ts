import mongoose from "mongoose";

const schema = mongoose.Schema       // Schema code
const userSchema = new schema({
  name : { type : String, required : true },
  email: { type : String , required : true, unique : true},
  password: { type : String, required : true},
  quiz_created_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes' }]

})



const User  = mongoose.model("User",userSchema)          // model code

export default User