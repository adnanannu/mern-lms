import express from "express";
import { createZoomMeeting } from "../controllers/zoom.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, createZoomMeeting);

export default router;
