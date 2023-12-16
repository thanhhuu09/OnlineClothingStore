const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json()); // Used to parse JSON bodies

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
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/user");

// Use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
