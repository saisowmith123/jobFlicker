const express = require("express");
const session = require("express-session");
const connectDB = require("./db");
const cors = require("cors");

// Route imports
const jobUserRoutes = require("./routes/jobUserRoutes");
const jobRoutes = require("./routes/jobRoutes");
const companyRoutes = require("./routes/companyRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
const port = process.env.PORT || 3100;

// Connect to MongoDB
connectDB();

// CORS setup
app.use(
  cors({
    origin: ["https://jobflicker-fe.onrender.com", "http://localhost:3000"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Register routes
app.use("/api", jobUserRoutes);
app.use("/api", jobRoutes);
app.use("/api", companyRoutes);
app.use("/api", applicationRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
