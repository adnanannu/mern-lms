import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
  // If frontend is on different origin (dev), sameSite should be "none" and secure true for https.
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // adjust if cross-origin
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ success: true, message, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
};
