import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
async function Dbconnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db connection succssefully");
  } catch (error) {
    console.log(error)
  }
 
}

export default Dbconnection;
