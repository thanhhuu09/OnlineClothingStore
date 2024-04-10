// Middleware relate to authentication
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");

// Verify token and decode user information
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Unauthorized. Missing Authorization header" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Token not found" });
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Forbidden. Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Forbidden. Admin permission required" });
  }
  next();
};

const verifyUser = (req, res, next) => {
  const { role, id } = req.user;
  const { params, body } = req;
  if (role !== "admin" && id != params.userId && id != body.userId) {
    return res.status(403).json({ error: "Forbidden. Permission denied" });
  }
  next();
};
module.exports = {
  verifyToken,
  verifyAdmin,
  verifyUser,
  verifyTokenAndAdminAuth: [verifyToken, verifyAdmin],
  verifyTokenAndAuth: [verifyToken, verifyUser],
};
