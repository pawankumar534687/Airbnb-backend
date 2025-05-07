import jwt from "jsonwebtoken";
import passport from "passport";

const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err && !info) {
      console.error("Unexpected error in login:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user)
      return res.status(401).json({ message: info?.message || "Login failed" });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
      process.env.JWT_SECRET || "pankajkumar",
      { expiresIn: "10d" }
    );
    const userResponse = { id: user._id };

    if (user.username) userResponse.username = user.username;
    if (user.email) userResponse.email = user.email;
    if (user.phone) userResponse.phone = user.phone;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse,
    });
  })(req, res, next);
};

export default login;
