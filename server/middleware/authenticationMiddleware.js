// Middleware relate to authentication
const jwt = require("jsonwebtoken");

// Verify token JWT
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // check if auth header exists
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Missing Authorization header" });
    }
    // check if token exists
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Token not provided" });
    }
    // verify token
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ error: "Forbidden. Invalid or expired token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Error authenticating token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify if user is admin
const verifyTokenAndAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  });
};

// Verify if user is admin or user owns the account
const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    const { role, id } = req.user;
    const { params } = req;

    if (role === "admin" || id === params.id) {
      next();
    } else {
      console.error("Unauthorized access: Forbidden");
      const errorMessage =
        role === "admin"
          ? "Forbidden. Admin permission required."
          : "Forbidden. User does not own the account.";
      return res.status(403).json({ error: errorMessage });
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAdminAuth,
  verifyTokenAndAuth,
};
