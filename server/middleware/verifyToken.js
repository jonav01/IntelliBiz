const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models/userModel");
const verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decodedToken.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authroized , no token");
  }
});

module.exports = verifyToken;
