import mongoose from "mongoose";

export async function connect() {
  
  try{

    const connectingString = MONGODB_URL


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