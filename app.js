import express from "express"
import Dbconnection from  "./config/db.js"
import dotenv from "dotenv"
import homeroute from "./routes/homeroute.js"
import cors from 'cors'
import reviewroute from "./routes/reviewroute.js"
import authentication from "./routes/authentication.js"
import {passport} from "./controller/authentication.js"

dotenv.config(); 
const app = express();
const port =  8000

app.set("view engine", "ejs")
app.use(cors({
    origin: "http://localhost:5173" 
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
Dbconnection()  

app.use("/api", homeroute)
app.use("/api", reviewroute)
app.use("/api", authentication)
   

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ error: message });
});




app.listen(port, ()=>{
    console.log("server is runing well")
})
