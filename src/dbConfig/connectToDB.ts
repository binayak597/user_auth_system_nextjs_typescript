import mongoose from "mongoose";

const connectToDB = async () =>{

  try {

    const connection = await mongoose.connect(process.env.MONGODB_URI!)
    

    //registering connection events
    connection.connection.on("connected", () => {
      console.log("MongoDB connected successfully...")
    })


    connection.connection.on("error", (error) => {

      console.error("MongoDB connection error, please make sure mongoDB is running " + error)
      process.exit(1)
    })
    
  } catch (error) {
    
    console.error("Something went wrong while connection to mongoDB")
    console.log(error)
    process.exit(1)
  }

}

export {connectToDB}