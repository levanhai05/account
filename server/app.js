// app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

// ROUTES
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

// MIDDLEWARE AUTH
const auth = require("./src/middlewares/auth"); // <-- thêm dòng này

const app = express();

// -------------------------
// GLOBAL MIDDLEWARE
// -------------------------
app.use(helmet());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// -------------------------
// STATIC FILES
// -------------------------
app.use(express.static(path.join(__dirname, "../client")));
app.use("/images", express.static(path.join(__dirname, "../client/images")));
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// -------------------------
// API ROUTES
// -------------------------
app.use("/api/auth", authRoutes);

// gắn middleware auth từ đây trở xuống
app.use(auth);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// -------------------------
// FRONTEND HTML
// -------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// -------------------------
// ERROR HANDLER
// -------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

module.exports = app;
