import mongoose from "mongoose";

export async function connect() {
  
  try{

    const connectingString = "mongodb+srv://MongoDB:password@cluster0.8n9ddxk.mongodb.net/question_Db?retryWrites=true&w=majority&appName=Cluster0"


    mongoose.connect(connectingString)
    const connection = mongoose.connection

    connection.on('connected',()=>{
      console.log(' MONOGODB IS connected ')
    })

    connection.on('error',(err)=>{
      console.log(" Make sure DB is Up and running "+err)
      process.exit()
    })
  }
  
  catch(error){
    console.log("Something wrong in this...")
    console.error(error)

  }
}