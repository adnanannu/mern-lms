// src/middlewares/isAuthenticated.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    // Read token from cookie or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "User not authenticated", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded?.userId) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }

    // Attach to request for downstream middlewares and controllers
    req.id = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    console.error("isAuthenticated error:", error);
    return res.status(401).json({ message: "User not authenticated", success: false });
  }
};

export default isAuthenticated;
