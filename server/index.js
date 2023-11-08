const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// body-parser is a middleware that parses incoming requests with JSON payloads
app.use(express.json());

// morgan is a middleware that logs HTTP requests
app.use(morgan("dev"));

// cors is a middleware that allows/disallows cross-origin resource requests
app.use(cors());
app.options("*", cors());

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
  console.log("Connected to MongoDB!");
});

// Routes
const authRoutes = require("./routes/auth");

// Use Routes
app.use("/api/v1/auth", authRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
