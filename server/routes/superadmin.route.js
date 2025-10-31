import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isSuperAdmin from "../middlewares/isSuperAdmin.js";
import { getAllUsers, changeUserRole } from "../controllers/superadmin.controller.js";
import { getTeacherRequests, approveTeacherRequest } from "../controllers/superadmin.controller.js";


const router = express.Router();

router.get("/users", isAuthenticated, isSuperAdmin, getAllUsers);
router.put("/users/:id/role", isAuthenticated, isSuperAdmin, changeUserRole);
// View all teacher requests
router.get("/teacher-requests", isAuthenticated, isSuperAdmin, getTeacherRequests);

// Approve a teacher request
router.put("/teacher-requests/:id/approve", isAuthenticated, isSuperAdmin, approveTeacherRequest);

export default router;
