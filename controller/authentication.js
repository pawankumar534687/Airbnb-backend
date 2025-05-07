import User from "../models/user.js";
import { Strategy as LocalStrategy } from "passport-local";
import ExpressError from "../utils/ExpressError.js";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";


const signup = async (req, res) => {

  const { username, identifier, password } = req.body;
  if (!username || !password || !identifier) {
    throw new ExpressError(
      400,
      "username and password and email or phone is required."
    );
  }
  const conditions = [];
  if (identifier.includes("@")) { 
    conditions.push({ email: identifier });
  } else {  
    conditions.push({ phone: identifier });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const existuser = await User.findOne({ $or: conditions });

  if (existuser) {
    throw new ExpressError(409, "Username, email, or phone already exist");
  }
  const newUser = new User({
    username,
    email: identifier.includes("@") ? identifier : undefined,  
    phone: !identifier.includes("@") ? identifier : undefined,
    password: hashedPassword,
  });
  await newUser.save();

  
  const token = jwt.sign(
        {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
        },
        process.env.JWT_SECRET || "pankajkumar",
        { expiresIn: "10d" }
      );
      const userResponse = { id: newUser._id };
  
      if (newUser.username) userResponse.username = newUser.username;
      if (newUser.email) userResponse.email = newUser.email;
      if (newUser.phone) userResponse.phone = newUser.phone;
  
      res.status(200).json({
        message: "signup successful",
        token,
        user: userResponse,
      });
};

// Login logic

passport.use(
  new LocalStrategy(
    {
      usernameField: "identifier",
      passwordField: "password",
    },
    async (identifier, password, done) => {
      try {
        const user = await User.findOne({
          $or: [
            { username: identifier },
            { email: identifier },
            { phone: identifier },
          ],
        });

      
        if (!user) return done(null, false, { message: "NO user Found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
          return done(null, false, {
            message: "Invalid credentials",
          });
        return done(null, user);
      } catch (error) {
       
        return done(error);
      }
    }
  )
);

export { signup, passport };
