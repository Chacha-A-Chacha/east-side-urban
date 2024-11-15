const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth/AuthRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

mongoose
  .connect("mongodb+srv://hakheem67:Hakheem%40Hector@east-side.vxhfe.mongodb.net/east-side")
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Error connecting to DB:", error));

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
