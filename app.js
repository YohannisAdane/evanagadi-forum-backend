const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const dbConnection = require("./DB/dbConfig");

// Import routes
const userRoutes = require("./router/userRoutes");
const questionRoute = require("./router/questionRoutes");
const answerRoute = require("./router/answerRoutes");
const authMiddleware = require("./middleware/authMiddleware");

// Middleware setup
app.use("/api/users", userRoutes);
app.use("/api/questions", authMiddleware, questionRoute);
app.use("/api/answers", authMiddleware, answerRoute);

const port = process.env.PORT || 3000;

async function start() {
  try {
    // Check database connection
    await dbConnection.query("SELECT NOW()"); // Adjust if using a different database client
    await app.listen(port);

    console.log("Database connection established");
    console.log(`Listening on ${port}`); // Use backticks for template literals
  } catch (error) {
    console.error("Error:", error.message); // Use console.error for better error reporting
  }
}

start();
