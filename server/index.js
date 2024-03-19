const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // Used to store sessions in MongoDB
require("dotenv").config();

app.use(cookieParser());

// Session middleware
app.use(
  session({
    secret: "secret",
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_STRING,
      collectionName: "sessions",
    }),
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json()); // Used to parse JSON bodies
app.use(
  express.urlencoded({
    extended: true,
  })
); //Parse URL-encoded bodies

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
const cartRoutes = require("./routes/cart");
const voucherRoutes = require("./routes/voucher");
const orderRoutes = require("./routes/order");
// Use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/vouchers", voucherRoutes);
app.use("/api/v1/orders", orderRoutes);
// Payment Routes
app.use("/api/v1/payment", require("./paymentGateway/paymentRoutes"));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
