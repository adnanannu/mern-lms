import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  stripeWebhook
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// Checkout session
router.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSession);

// Stripe webhook (raw body required)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Course details with purchase status
router.get("/course/:courseId/detail-with-status", isAuthenticated, getCourseDetailWithPurchaseStatus);

// Get all enrolled courses
router.get("/", isAuthenticated, getAllPurchasedCourse);

export default router;
