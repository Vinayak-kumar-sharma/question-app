import mongoose from "mongoose";

const schema = mongoose.Schema       // Schema code
const userSchema = new schema({
  name : { type : String, require : true },
  email: { type : String , require : true, unique : true},
  password: { type : String, require : true},
  quiz_created_id : [{type : schema.Types.ObjectId, ref : 'Quizzes'}]
})



const User  = mongoose.model("User",userSchema)          // model code

export default User