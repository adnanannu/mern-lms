// src/middlewares/isSuperAdmin.js
const isSuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "superadmin") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  next();
};

export default isSuperAdmin;
