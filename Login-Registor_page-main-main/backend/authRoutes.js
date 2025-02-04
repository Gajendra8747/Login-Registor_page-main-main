import express from "express";
import User from "./userSchema.js";
import 'dotenv/config'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateToken from "./token.js";  


const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Register Route
router.post("/register", async (req, res) => {
//  try {
//   const { username, password } = req.body;

//   const userExists = await User.findOne({ username });
//   if (userExists) return res.status(400).json({ msg: "User already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({ username, password: hashedPassword });
//   await newUser.save();

//   res.status(201).json({ msg: "User registered successfully" });
//  } catch (error) {
//    console.log(error);
//    res.status(500).json({msg:"internal server error"});
   
//  }

console.log('register');
return json({msg:"register"})


});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"internal server error"});
  }
});

// Dashboard Route (Protected)
router.get("/dashboard", authenticateToken, (req, res) => {
  try {
    res.json({ message: "Welcome to your dashboard!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"internal server error"});
  }
});

export default router;
