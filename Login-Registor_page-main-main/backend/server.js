import express from "express";
import 'dotenv/config';
import { connect } from "mongoose";
import cors from "cors";
import authRoutes from './authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend URL
app.use(
  cors({
    origin: "https://login-registor-page-main-main-bcvv.vercel.app", // Update to your frontend URL
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies and credentials if needed
  })
);
// app.use(cors({
//   origin:'http://127.0.0.1:5500',
//   methods: ["GET","POST","PUT","DELETE"],
// }))
// app.use(cors())
// Middleware setup
app.use(express.json()); // Parse incoming JSON requests


// Simple test route
app.get("/", (req, res) => {
  res.json("Hello from server!");
});
app.use("/api", authRoutes); 

// MongoDB connection
connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
