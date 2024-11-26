import mongoose from "mongoose";

const connection = async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log("database connection established");
    })
  } catch (error) {
    console.log("database connection error", error);
  }
}

export default connection;