import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";

import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import zoomRoute from "./routes/zoom.route.js";
import testRoute from "./routes/test.route.js";
import superAdminRoutes from "./routes/superadmin.route.js";
import { stripeWebhook } from "./controllers/coursePurchase.controller.js";

dotenv.config();

// Call database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Stripe webhook route must be before express.json()
app.post(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Default middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// APIs
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/zoom", zoomRoute);
app.use("/api/v1/test", testRoute);
app.use("/api/superadmin", superAdminRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
