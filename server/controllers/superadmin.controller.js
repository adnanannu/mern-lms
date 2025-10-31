import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("getAllUsers error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!["student", "instructor", "superadmin"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    return res.status(200).json({ success: true, message: "User role updated", user });
  } catch (error) {
    console.error("changeUserRole error:", error);
    return res.status(500).json({ success: false, message: "Failed to change role" });
  }
};
// Get all pending teacher requests
export const getTeacherRequests = async (req, res) => {
  try {
    const requests = await User.find({ teacherRequest: true }).select("name email role teacherRequest");
    res.status(200).json({ success: true, requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch requests" });
  }
};

// Approve teacher request
export const approveTeacherRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (!user.teacherRequest) return res.status(400).json({ success: false, message: "No pending request" });

    user.role = "instructor";
    user.teacherRequest = false;
    await user.save();

    res.status(200).json({ success: true, message: `${user.name} is now an instructor` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to approve request" });
  }
};

