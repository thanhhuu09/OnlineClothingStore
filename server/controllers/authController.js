// Auth controllers
const User = require("../models/User");
const bcrypt = require("bcrypt");
const tokenService = require("../services/tokenService");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const authController = {
  // REGISTER A NEW USER
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ msg: "Passwords do not match. Please try again" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      res
        .status(200)
        .json({ msg: "User created successfully", data: savedUser });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: error.message });
    }
  },
  // LOGIN A USER
  login: async (req, res) => {
    try {
      const { email, password, remember } = req.body;
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Incorrect password" });
      }
      const expiresIn = remember ? 7 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000; // 7 days : 15 minutes

      // Generate JWT token
      const accessToken = tokenService.generateAccessToken(user);
      // Generate refresh token
      const refreshToken = tokenService.generateRefreshToken(user, expiresIn);

      // save refresh token to database
      const newRefreshToken = new RefreshToken({
        userId: user._id,
        refreshToken: refreshToken,
        expiresAt: Date.now() + expiresIn,
      });
      await newRefreshToken.save();

      // Save refresh token to httpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/", // Set cookie to root path
        expiresIn: new Date(Date.now() + expiresIn),
        secure: false, // If using HTTPS, set this to true
        sameSite: "strict", // Only allow cookies to be sent with requests from the same site
      });
      const { password: userPassword, ...userInfo } = user._doc; // Remove password from user info
      return res.status(200).json({
        msg: "Login successfully",
        data: { user: userInfo, accessToken },
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Login failed. Please try again." });
    }
  },

  // LOGOUT A USER
  logout: async (req, res) => {
    try {
      // Invalidate refresh token in database
      const deletedRefreshToken = await RefreshToken.findOneAndDelete({
        refreshToken: req.cookies.refreshToken,
      });
      if (!deletedRefreshToken) {
        return res.status(400).json({ error: "Invalid refresh token" });
      }
      // Clear refresh token from the cookie
      res.clearCookie("refreshToken");
      return res.status(200).json({ msg: "Logout successfully" });
    } catch (error) {
      console.error("Error logging out user:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // CREATE A NEW ACCESS TOKEN FROM REFRESH TOKEN
  refreshToken: async (req, res) => {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return res
        .status(403)
        .json({ error: "Forbidden. No refresh token provided" });
    }
    try {
      jwt.verify(
        oldRefreshToken,
        process.env.JWT_REFRESH_SECRET,
        async (err, user) => {
          if (err) {
            return res
              .status(403)
              .json({ error: "Forbidden. Invalid refresh token" });
          }
          // If refresh token is valid, delete it from database
          const deletedRefreshToken = await RefreshToken.findOneAndDelete({
            userId: user.id,
            refreshToken: oldRefreshToken,
          });
          if (!deletedRefreshToken) {
            return res.status(403).json({
              error: "Forbidden. Not found refresh token in database",
            });
          }
          // Generate new access token, refresh token
          const accessToken = tokenService.generateAccessToken(user);
          const newRefreshToken = tokenService.generateRefreshToken(
            user,
            7 * 24 * 60 * 60 * 1000
          ); // 7 days
          // Save new refresh token to database
          const newRefreshTokenDoc = new RefreshToken({
            userId: user.id,
            refreshToken: newRefreshToken,
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
          });
          await newRefreshTokenDoc.save();
          // Save refresh token to httpOnly cookie
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: false,
            sameSite: "strict", // Only allow cookies to be sent with requests from the same site
          });
          // Send new access token to client
          return res
            .status(200)
            .json({ accessToken, user, msg: "Token refreshed" });
        }
      );
    } catch (error) {
      console.error("Error refreshing token:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
